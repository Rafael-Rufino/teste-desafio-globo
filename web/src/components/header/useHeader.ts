import { useCallback, useEffect, useRef, useState, useMemo } from 'react'

import {
  getHighlight,
  getSuggestion,
} from '../../services/sdk/modules/searchService'

import { normalizeString } from '../../utils/normalizedString'
import { KEY_CODES } from '../../constants/key-codes'
import { ISuggestion, IHighlight } from '../../entities'

const useHeader = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [initialSuggestions, setInitialSuggestions] = useState<ISuggestion[]>(
    []
  )
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([])
  const [initialHighlights, setInitialHighlights] = useState<IHighlight[]>([])
  const [highlights, setHighlights] = useState<IHighlight[]>([])
  const [suggestionIndex, setSuggestionIndex] = useState(-1)
  const [originalValue, setOriginalValue] = useState('')

  const modalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const sortByLength = (a: ISuggestion, b: ISuggestion) =>
    a.value.length - b.value.length

  function normalizeData<T extends { id: string; value: string }>(
    data: T[]
  ): T[] {
    return data.map((item) => ({
      ...item,
      value: normalizeString(item.value),
    }))
  }

  const fetchSuggestions = useCallback(async () => {
    try {
      const suggestionData = await getSuggestion()
      const normalizedSuggestions = normalizeData(suggestionData.suggestions)
      setInitialSuggestions(normalizedSuggestions)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }, [])

  const fetchHighlights = useCallback(async () => {
    try {
      const highlightData = await getHighlight()

      const normalizedHighlights = highlightData.highlights.map(
        (highlight: IHighlight) => ({
          ...highlight,
          queries: normalizeData(highlight.queries),
        })
      )
      setInitialHighlights(normalizedHighlights)
    } catch (error) {
      console.error('Error fetching highlights:', error)
    }
  }, [])

  const filteredSuggestionsByQuery = useMemo(() => {
    return suggestions.filter((suggestion: ISuggestion) =>
      normalizeString(suggestion.value).includes(
        normalizeString(inputRef.current?.value?.trim() || '')
      )
    )
  }, [suggestions])

  useEffect(() => {
    fetchSuggestions()
    fetchHighlights()
  }, [fetchSuggestions, fetchHighlights])

  const handleSearchChange = useCallback(() => {
    const inputValue = inputRef.current?.value || ''
    const normalizedInputValue = normalizeString(inputValue.trim())
    const isSearchNotEmpty = normalizedInputValue.length > 0

    setOriginalValue(normalizedInputValue)

    const words = normalizedInputValue.split(' ')
    const filteredSuggestions = filterSuggestions(words)
    const filteredHighlightsByQuery = filterHighlightsByQuery(words)

    setSuggestions(filteredSuggestions)
    setHighlights(filteredHighlightsByQuery)
    setIsModalVisible(isSearchNotEmpty)
  }, [suggestionIndex, originalValue, initialSuggestions, initialHighlights])

  const filterSuggestions = useCallback(
    (words: string[]) => {
      return initialSuggestions
        .filter((suggestion) => {
          const normalizedSuggestion = normalizeString(suggestion.value)
          const searchWords = words.map(normalizeString)
          return searchWords.every((word) =>
            normalizedSuggestion.includes(word)
          )
        })
        .sort(sortByLength)
    },
    [initialSuggestions]
  )

  const filterHighlightsByQuery = useCallback(
    (words: string[]) => {
      return initialHighlights.filter((highlight) =>
        highlight.queries.some((highlightQuery) =>
          words.some((word) => highlightQuery.value.includes(word))
        )
      )
    },
    [initialHighlights]
  )

  const handleArrowKeyNavigation = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const isArrowRight = event.key === KEY_CODES.ARROW_RIGHT
      const isArrowLeft = event.key === KEY_CODES.ARROW_LEFT
      if (isArrowRight) {
        handleArrowRight(event)
      } else if (isArrowLeft) {
        handleArrowLeft(event)
      }
    },
    [suggestionIndex, filteredSuggestionsByQuery, originalValue, inputRef]
  )

  const handleArrowRight = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault()
      if (canIncrementSuggestionIndex()) {
        updateInputValue(filteredSuggestionsByQuery[suggestionIndex + 1]?.value)
        setSuggestionIndex(suggestionIndex + 1)
      }
    },
    [suggestionIndex, filteredSuggestionsByQuery, setSuggestionIndex]
  )

  const handleArrowLeft = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault()
      if (canDecrementSuggestionIndex()) {
        const prevSuggestion = filteredSuggestionsByQuery[suggestionIndex - 1]
        if (prevSuggestion) {
          updateInputValue(prevSuggestion.value)
          setSuggestionIndex(suggestionIndex - 1)
        } else {
          resetInputToOriginalValue()
        }
      }
    },
    [suggestionIndex, filteredSuggestionsByQuery, setSuggestionIndex]
  )

  const canIncrementSuggestionIndex = () => {
    return suggestionIndex < filteredSuggestionsByQuery.length - 1
  }

  const canDecrementSuggestionIndex = () => {
    return suggestionIndex > -1 && suggestionIndex - 1 >= 0
  }

  const updateInputValue = (value: string) => {
    if (inputRef.current) {
      inputRef.current.value = value
    }
  }

  const resetInputToOriginalValue = () => {
    if (inputRef.current) {
      inputRef.current.value = originalValue
    }
    setSuggestionIndex(-1)
  }

  const closeModalAndResetSearch = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    setIsModalVisible(false)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModalAndResetSearch()
      }
    }

    if (isModalVisible) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isModalVisible, closeModalAndResetSearch])

  return {
    closeModalAndResetSearch,
    isModalVisible,
    highlights,
    handleSearchChange,
    handleArrowKeyNavigation,
    filteredSuggestionsByQuery,
    modalRef,
    inputRef,
  }
}

export default useHeader

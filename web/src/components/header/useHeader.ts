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
  const [query, setQuery] = useState('')
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

  const getSuggestions = useCallback(async () => {
    try {
      const suggestionData = await getSuggestion()
      const normalizedSuggestions = normalizeData(suggestionData.suggestions)
      setInitialSuggestions(normalizedSuggestions)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }, [])

  const getHighlights = useCallback(async () => {
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
      normalizeString(suggestion.value).includes(normalizeString(query.trim()))
    )
  }, [suggestions])

  useEffect(() => {
    getSuggestions()
    getHighlights()
  }, [getSuggestions, getHighlights])

  const handleSearchChange = useCallback(() => {
    const inputValue = inputRef.current?.value || ''
    const normalizedInputValue = normalizeString(inputValue.trim())
    const isSearchNotEmpty = normalizedInputValue.length > 0

    setOriginalValue(normalizedInputValue)
    setQuery(inputValue)

    const words = normalizedInputValue.split(' ')

    const filteredSuggestions = filterSuggestions(words)
    const filteredHighlightsByQuery = filterHighlightsByQuery(words)

    setSuggestions(filteredSuggestions)
    setHighlights(filteredHighlightsByQuery)
    setIsModalVisible(isSearchNotEmpty)
  }, [suggestionIndex, originalValue, initialSuggestions, initialHighlights])

  function filterSuggestions(words: string[]) {
    return initialSuggestions
      .filter((suggestion) => {
        const normalizedSuggestion = normalizeString(suggestion.value)
        const searchWords = words.map(normalizeString)
        return searchWords.every((word) => normalizedSuggestion.includes(word))
      })
      .sort(sortByLength)
  }

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
        event.preventDefault()

        if (suggestionIndex < filteredSuggestionsByQuery.length - 1) {
          setSuggestionIndex(suggestionIndex + 1)
          setQuery(filteredSuggestionsByQuery[suggestionIndex + 1].value)
        }
      } else if (isArrowLeft) {
        event.preventDefault()

        if (suggestionIndex > -1) {
          if (suggestionIndex - 1 >= 0) {
            setSuggestionIndex(suggestionIndex - 1)
            setQuery(filteredSuggestionsByQuery[suggestionIndex - 1].value)
          } else {
            setQuery(originalValue)
            setSuggestionIndex(-1)
          }
        }
      }
    },
    [filteredSuggestionsByQuery, originalValue, suggestionIndex]
  )

  const closeModalAndResetSearch = useCallback(() => {
    setQuery('')
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
    query,
    inputRef,
  }
}

export default useHeader

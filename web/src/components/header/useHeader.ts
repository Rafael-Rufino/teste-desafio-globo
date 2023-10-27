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

  const sortByLength = (a: ISuggestion, b: ISuggestion) =>
    a.value.length - b.value.length

  function normalizeData(data: any) {
    return data.map((item: any) => ({
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
      normalizeString(suggestion.value).includes(normalizeString(query))
    )
  }, [suggestions])

  useEffect(() => {
    getSuggestions()
    getHighlights()
  }, [getSuggestions, getHighlights])

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target

      const normalizedValue = normalizeString(value.trim())
      const isSearchNotEmpty = normalizedValue.length > 0

      setOriginalValue(normalizedValue)
      setQuery(value)

      const words = normalizedValue.split(' ')

      const filteredSuggestions = initialSuggestions
        .filter((suggestion: ISuggestion) => {
          const normalizedSuggestion = normalizeString(suggestion.value)

          const searchWords = words.map(normalizeString)

          return searchWords.every((word) =>
            normalizedSuggestion.includes(word)
          )
        })
        .sort(sortByLength)

      const filteredResults = initialHighlights.filter(
        (highlight: IHighlight) =>
          highlight.queries.some((highlightQuery) =>
            words.some((word) => highlightQuery.value.includes(word))
          )
      )

      setSuggestions(filteredSuggestions)
      setHighlights(filteredResults)
      setIsModalVisible(isSearchNotEmpty)
    },
    [suggestionIndex, originalValue, initialSuggestions, initialHighlights]
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
    handleSearch,
    handleArrowKeyNavigation,
    filteredSuggestionsByQuery,
    modalRef,
    query,
  }
}

export default useHeader

import { useEffect, useRef, useState } from 'react'

import {
  getHighlight,
  getSuggestion,
} from '../../services/sdk/modules/searchService'

import { normalizeString } from '../../utils/normalizedString'

import { IHighlight, ISuggestion } from './interface'

const KEY_CODES = {
  ARROW_RIGHT: 'ArrowRight',
  ARROW_LEFT: 'ArrowLeft',
}

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

  const filterSuggestionsByQuery = suggestions.filter(
    (suggestion: ISuggestion) =>
      normalizeString(suggestion.value).includes(normalizeString(query))
  )

  useEffect(() => {
    async function fetchData() {
      try {
        const [suggestionData, highlightData] = await Promise.all([
          getSuggestion(),
          getHighlight(),
        ])

        const normalizedSuggestions = normalizeData(suggestionData.suggestions)

        const normalizedHighlights = highlightData.highlights.map(
          (highlight: IHighlight) => ({
            ...highlight,
            queries: normalizeData(highlight.queries),
          })
        )

        setHighlights(normalizedHighlights)
        setSuggestions(normalizedSuggestions)
        setInitialSuggestions(normalizedSuggestions)
        setInitialHighlights(normalizedHighlights)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const normalizedValue = normalizeString(value.trim())

    const isSearchNotEmpty = normalizedValue.length > 0

    setOriginalValue(normalizedValue)

    setQuery(value)

    const words = normalizedValue.split(' ')

    const filteredSuggestions = initialSuggestions.filter(
      (suggestion: ISuggestion) =>
        words.some((word) => suggestion.value.includes(word))
    )

    filteredSuggestions.sort(sortByLength)

    const filteredResults = initialHighlights.filter((highlight: IHighlight) =>
      highlight.queries.some((highlightQuery) =>
        words.some((word) => highlightQuery.value.includes(word))
      )
    )

    setSuggestions(filteredSuggestions)
    setHighlights(filteredResults)
    setIsModalVisible(isSearchNotEmpty)
  }

  const handleArrowKeyNavigation = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const { key } = event
    const isArrowRight = key === KEY_CODES.ARROW_RIGHT
    const isArrowLeft = key === KEY_CODES.ARROW_LEFT

    if (isArrowRight) {
      event.preventDefault()

      if (suggestionIndex < filterSuggestionsByQuery.length - 1) {
        setSuggestionIndex(suggestionIndex + 1)
        setQuery(filterSuggestionsByQuery[suggestionIndex + 1].value)
      }
    } else if (isArrowLeft) {
      event.preventDefault()

      if (suggestionIndex > -1) {
        if (suggestionIndex - 1 >= 0) {
          setSuggestionIndex(suggestionIndex - 1)
          setQuery(filterSuggestionsByQuery[suggestionIndex - 1].value)
        } else {
          setQuery(originalValue)
          setSuggestionIndex(-1)
        }
      }
    }
  }

  function closeModalAndResetSearch() {
    setQuery('')
    setIsModalVisible(false)
  }

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
  }, [isModalVisible])

  return {
    closeModalAndResetSearch,
    filterSuggestionsByQuery,
    isModalVisible,
    highlights,
    handleSearch,
    handleArrowKeyNavigation,
    modalRef,
    query,
  }
}

export default useHeader

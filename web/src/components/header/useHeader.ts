import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { KEY_CODES } from '../../constants/key-codes'
import { IHighlight, ISuggestion } from '../../entities'

import { HighlightService, SuggestionService } from '../../services/module'
import { normalizeData } from '../../utils/normalizeData'
import { normalizeString } from '../../utils/normalizedString'

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

  const sortSuggestions = (suggestions: ISuggestion[]) => {
    return suggestions.slice().sort((a, b) => {
      return a.value.length - b.value.length
    })
  }

  const fetchSuggestions = useCallback(async () => {
    try {
      const suggestionList = await SuggestionService.listSuggestions()
      const normalizedSuggestions = normalizeData(suggestionList.suggestions)
      setInitialSuggestions(normalizedSuggestions)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }, [])

  const fetchHighlights = useCallback(async () => {
    try {
      const highlightList = await HighlightService.listHighlights()
      const normalizedHighlights = highlightList.highlights.map(
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

  useEffect(() => {
    fetchHighlights()
    fetchSuggestions()
  }, [])

  const filteredSuggestionsByQuery = useMemo(() => {
    const inputValue = inputRef.current?.value?.trim()
    return suggestions.filter((suggestion) =>
      normalizeString(suggestion.value).includes(
        normalizeString(inputValue || '')
      )
    )
  }, [suggestions])

  const handleChangeSearch = () => {
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
  }

  const filterSuggestions = useMemo(
    () => (words: string[]) => {
      const filteredSuggestions = initialSuggestions.filter((suggestion) =>
        words.some((word) => normalizeString(suggestion.value).includes(word))
      )
      return sortSuggestions(filteredSuggestions)
    },
    [initialSuggestions]
  )

  const filterHighlightsByQuery = useMemo(
    () => (words: string[]) => {
      return initialHighlights.filter((highlight) =>
        highlight.queries.some((highlightQuery) =>
          words.some((word) => highlightQuery.value.includes(word))
        )
      )
    },
    [initialHighlights]
  )
  // altera a seta do teclado para direita e esquerda para navegar entre as sugestões
  const handleArrowKeyNavigation = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const isArrowRight = event.key === KEY_CODES.ARROW_RIGHT
    const isArrowLeft = event.key === KEY_CODES.ARROW_LEFT
    if (isArrowRight) {
      handleArrowRight(event)
    } else if (isArrowLeft) {
      handleArrowLeft(event)
    }
  }

  const handleArrowRight = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (canIncrementSuggestionIndex()) {
      updateInputValue(filteredSuggestionsByQuery[suggestionIndex + 1]?.value)
      setSuggestionIndex(suggestionIndex + 1)
    }
  }

  const handleArrowLeft = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
  }

  const canIncrementSuggestionIndex = useCallback(() => {
    return suggestionIndex < filteredSuggestionsByQuery.length - 1
  }, [suggestionIndex, filteredSuggestionsByQuery])

  const canDecrementSuggestionIndex = useCallback(() => {
    return suggestionIndex > -1
  }, [suggestionIndex])

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

  // Fecha o modal e reseta o input de busca
  const closeModalAndResetSearch = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    setIsModalVisible(false)
  }, [])

  // Fecha o modal ao clicar fora dele
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
    handleChangeSearch,
    handleArrowKeyNavigation,
    filteredSuggestionsByQuery,
    modalRef,
    inputRef,
  }
}

export default useHeader

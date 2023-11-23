import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { KEY_CODES } from '../../../constants/key-codes'
import { IHighlight, ISuggestion } from '../../../entities'

import { HighlightService, SuggestionService } from '../../../services/module'
import { normalizeData, normalizeString } from '../../../utils'

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

  useEffect(() => {
    const fetchHighlights = async () => {
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
        throw new Error(error as string)
      }
    }

    const fetchSuggestions = async () => {
      try {
        const suggestionList = await SuggestionService.listSuggestions()
        setInitialSuggestions(normalizeData(suggestionList.suggestions))
      } catch (error) {
        throw new Error(error as string)
      }
    }

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

  const filterSuggestions = useCallback(
    (words: string[]) =>
      sortSuggestions(
        initialSuggestions.filter((suggestion) =>
          words.some((word) => normalizeString(suggestion.value).includes(word))
        )
      ),
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
  // altera a seta do teclado para direita e esquerda para navegar entre as sugestões
  const handleArrowKeyNavigation: React.KeyboardEventHandler<
    HTMLInputElement
  > = (event) => {
    const isArrowRight = event.key === KEY_CODES.ARROW_RIGHT
    const isArrowLeft = event.key === KEY_CODES.ARROW_LEFT

    if (isArrowRight) {
      handleArrowRight(event)
    } else if (isArrowLeft) {
      handleArrowLeft(event)
    }
  }

  const handleArrowRight = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault()
      if (canIncrementSuggestionIndex()) {
        updateInputValue(filteredSuggestionsByQuery[suggestionIndex + 1]?.value)
        setSuggestionIndex(suggestionIndex + 1)
      }
    },
    [suggestionIndex, filteredSuggestionsByQuery]
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
    [suggestionIndex, filteredSuggestionsByQuery]
  )

  const canIncrementSuggestionIndex = useCallback(
    () => suggestionIndex < filteredSuggestionsByQuery.length - 1,
    [suggestionIndex, filteredSuggestionsByQuery]
  )

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

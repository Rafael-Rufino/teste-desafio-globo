import React, { useEffect, useRef, useState } from 'react'

import { FiSearch } from 'react-icons/fi'

import theme from '../../assets/styles/themes/default'

import { getHighlight, getSuggestion } from '../../sdk/modules/searchService'

import { normalizeString } from '../../utils/normalizedString'

import { SearchInput } from '../searchInput'
import { SearchModal } from '../searchModal'

import * as S from './styles'

export interface IHighlight {
  id: string
  title: string
  url: string
  logo: string
  queries: { value: string }[]
}

interface ISuggestion {
  value: string
}

function normalizeData(data: ISuggestion[]) {
  return data.map((item) => ({
    value: normalizeString(item.value),
  }))
}

const KEY_CODES = {
  ARROW_RIGHT: 'ArrowRight',
  ARROW_LEFT: 'ArrowLeft',
}

export const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [query, setQuery] = useState('')
  const [initialSuggestions, setInitialSuggestions] = useState<ISuggestion[]>(
    []
  )
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([])
  const [initialHighlights, setInitialHighlights] = useState<IHighlight[]>([])
  const [highlights, setHighlights] = useState<IHighlight[]>([])
  const [suggestionIndex, setSuggestionIndex] = useState(-1)
  const modalRef = useRef<HTMLDivElement>(null)

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

    const hasSearchValid = value.length >= 1

    setQuery(value)

    const filteredSuggestions = initialSuggestions.filter(
      (suggestion: ISuggestion) => suggestion.value.includes(normalizedValue)
    )

    const customSort = (a: ISuggestion, b: ISuggestion) =>
      a.value.length - b.value.length
    filteredSuggestions.sort(customSort)

    const filteredResults = initialHighlights.filter((highlight: IHighlight) =>
      highlight.queries.some((highlightQuery) =>
        highlightQuery.value.includes(normalizedValue)
      )
    )

    setSuggestions(filteredSuggestions)
    setHighlights(filteredResults)
    setIsModalVisible(hasSearchValid)
  }

  const suggestionsValues = suggestions.map((suggestion) => suggestion.value)

  const hasSuggestions =
    suggestions.find((suggestion) => suggestion.value.includes(query))?.value ||
    query

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event
    const isArrowRight = key === KEY_CODES.ARROW_RIGHT
    const isArrowLeft = key === KEY_CODES.ARROW_LEFT

    if (isArrowRight) {
      event.preventDefault()

      if (suggestionIndex < suggestionsValues.length - 1) {
        setSuggestionIndex(suggestionIndex + 1)
        setQuery(suggestionsValues[suggestionIndex + 1])
      }
    } else if (isArrowLeft) {
      event.preventDefault()

      if (suggestionIndex > -1) {
        setSuggestionIndex(suggestionIndex - 1)

        if (suggestionIndex - 1 >= 0) {
          setQuery(suggestionsValues[suggestionIndex - 1])
        } else {
          closeModalAndResetSearch()
        }
      }
    }
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

  function closeModalAndResetSearch() {
    setQuery('')
    setIsModalVisible(false)
  }
  return (
    <S.ContainerHeader>
      <S.Wrapper>
        <S.Logo
          src="http://s.glbimg.com/bu/i/fc/5fb2e18d-a47f-4bb8-9a7e-b66871cf53c0.png"
          alt="Logo do g1.globo"
        />
      </S.Wrapper>
      <S.Content>
        <SearchInput
          type="text"
          placeholder="Digite sua busca"
          value={query}
          onChange={handleSearch}
          icon={<FiSearch size={24} color={theme.colors.gray.dark} />}
          onKeyDown={handleKeyDown}
        />
        {isModalVisible && (
          <S.WrapperModal ref={modalRef}>
            <SearchModal
              searchResults={highlights}
              suggestionValue={hasSuggestions}
              suggestions={suggestionsValues}
              isOpen={isModalVisible}
              onClose={closeModalAndResetSearch}
            />
          </S.WrapperModal>
        )}
      </S.Content>
    </S.ContainerHeader>
  )
}

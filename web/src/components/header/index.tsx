import React, { useEffect, useState } from 'react'

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

  function closeModalAndResetSearch() {
    setIsModalVisible(false)
    setQuery('')
    setSuggestions(initialSuggestions)
    setHighlights(initialHighlights)
  }

  const suggestionsValues = suggestions.map((suggestion) => suggestion.value)

  const hasSuggestions =
    suggestions.find((suggestion) => suggestion.value.includes(query))?.value ||
    query

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const isArrowRight = event.key === 'ArrowRight'
    const isArrowLeft = event.key === 'ArrowLeft'

    event.preventDefault()

    if (isArrowRight && suggestionIndex < suggestionsValues.length - 1) {
      setSuggestionIndex(suggestionIndex + 1)
      setQuery(suggestionsValues[suggestionIndex + 1])
    } else if (isArrowLeft) {
      if (suggestionIndex > -1) {
        setSuggestionIndex(suggestionIndex - 1)
        setQuery(
          suggestionIndex - 1 >= 0 ? suggestionsValues[suggestionIndex - 1] : ''
        )
        resetInput(suggestionIndex - 1 < 0)
      }
    }
  }

  const resetInput = (isNegative: boolean) => {
    setQuery('')
    setHighlights([])
    setIsModalVisible(!isNegative)
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
          <SearchModal
            searchResults={highlights}
            suggestionValue={hasSuggestions}
            suggestions={suggestionsValues}
            isOpen={isModalVisible}
            onClose={closeModalAndResetSearch}
          />
        )}
      </S.Content>
    </S.ContainerHeader>
  )
}

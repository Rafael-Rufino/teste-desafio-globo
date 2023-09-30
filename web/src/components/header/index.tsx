import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import theme from '../../assets/styles/themes/default'
import { getHighlight, getSuggestion } from '../../sdk/modules/getSearch'
import { normalizeString } from '../../utils/normalizedString'
import { Modal } from '../modal'
import { SearchInput } from '../searchInput'
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

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([])
  const [originalSuggestions, setOriginalSuggestions] = useState<ISuggestion[]>(
    []
  )
  const [originalHighlights, setOriginalHighlights] = useState<IHighlight[]>([])
  const [searchResults, setSearchResults] = useState<IHighlight[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const [suggestionData, highlightData] = await Promise.all([
          getSuggestion(),
          getHighlight(),
        ])

        const normalizedSuggestions = suggestionData.suggestions.map(
          (suggestion: ISuggestion) => ({
            value: normalizeString(suggestion.value),
          })
        )

        const normalizedHighlights = highlightData.highlights.map(
          (highlight: IHighlight) => ({
            ...highlight,
            queries: highlight.queries.map((query) => ({
              value: normalizeString(query.value),
            })),
          })
        )

        setSearchResults(normalizedHighlights)
        setSuggestions(normalizedSuggestions)
        setOriginalSuggestions(normalizedSuggestions)
        setOriginalHighlights(normalizedHighlights)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const normalizedValue = normalizeString(value)
    const hasSearchValid = value.length >= 1

    setQuery(value)

    const filteredSuggestions = originalSuggestions.filter(
      (suggestion: ISuggestion) => suggestion.value.includes(normalizedValue)
    )

    const filteredResults = originalHighlights.filter((highlight: IHighlight) =>
      highlight.queries.some((highlightQuery) =>
        normalizeString(highlightQuery.value).includes(normalizedValue)
      )
    )

    setSuggestions(filteredSuggestions)
    setSearchResults(filteredResults)
    setIsModalOpen(hasSearchValid)
  }

  function handleClosedModal() {
    setIsModalOpen(false)
    setSuggestions(originalSuggestions)
    setSearchResults(originalHighlights)
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
        />
        {isModalOpen && (
          <Modal
            searchResults={searchResults}
            suggestions={
              suggestions.map((suggestion) => suggestion.value) as string[]
            }
            isOpen={isModalOpen}
            onClose={handleClosedModal}
          />
        )}
      </S.Content>
    </S.ContainerHeader>
  )
}

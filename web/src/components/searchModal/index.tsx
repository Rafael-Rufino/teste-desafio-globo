import * as S from './styles'

import { Divider } from '../divider'

import SearchResultNotFound from './components/searchResultNotFound'
import SuggestionSearchLink from './components/suggestionSearchLink'

import SearchResultList from './components/searchResultList'
import SearchResultHeader from './components/searchResultHeader'
import { IHighlight, ISuggestion } from '../../entities'

export interface SearchModalProps {
  searchResults: IHighlight[]
  suggestions: ISuggestion[]
  suggestionValue: string
  isOpen: boolean
  onClose: () => void
}

export const SearchModal = ({
  searchResults,
  suggestions,
  suggestionValue,
  isOpen,
  onClose,
}: SearchModalProps) => {
  const hasSearchResults = searchResults.length > 0

  return (
    <>
      {isOpen && (
        <S.ContainerModal role="modal" onClick={onClose}>
          {hasSearchResults && (
            <>
              <SearchResultHeader searchResults={searchResults} />
              <Divider />
              <SearchResultList suggestions={suggestions} />
              <Divider />
              <SuggestionSearchLink
                suggestionValue={`${suggestionValue} na Globo.com`}
                searchUrl={`http://g1.globo.com/busca/?q=${encodeURIComponent(
                  suggestionValue
                )}`}
                title={`Você será redirecionado para página do Globo.com com a busca ${suggestionValue}`}
              />
              <Divider />
              <SuggestionSearchLink
                suggestionValue={`${suggestionValue} na Web`}
                searchUrl={`https://www.google.com/search?q=${encodeURIComponent(
                  suggestionValue
                )}`}
                title={`Você será redirecionado para página do Google com a busca ${suggestionValue}`}
              />
            </>
          )}
          {!hasSearchResults && <SearchResultNotFound />}
        </S.ContainerModal>
      )}
    </>
  )
}

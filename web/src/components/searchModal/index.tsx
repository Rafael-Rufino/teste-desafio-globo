import * as S from './styles'

import { IHighlight, ISuggestion } from '../../entities'

import { Divider } from '../divider'
import SearchResultHeader from './components/highlightSearchResultLink'
import SearchResultList from './components/searchResultList'
import SearchResultNotFound from './components/searchResultNotFound'
import SuggestionSearchResultLink from './components/suggestionSearchResultLink'

export interface SearchModalProps {
  highlightSearchResult: IHighlight[]
  suggestions: ISuggestion[]
  suggestionValue: string
  isOpen: boolean
  onClose: () => void
}

export const SearchModal = ({
  highlightSearchResult,
  suggestions,
  suggestionValue,
  isOpen,
  onClose,
}: SearchModalProps) => {
  const hasSearchResults = highlightSearchResult.length > 0

  return (
    <>
      {isOpen && (
        <S.ContainerModal role="modal" onClick={onClose}>
          {hasSearchResults && (
            <>
              <SearchResultHeader
                highlightSearchResultLink={highlightSearchResult}
              />
              <Divider />
              <SearchResultList suggestions={suggestions} />
              <Divider />
              <SuggestionSearchResultLink
                suggestionValue={`${suggestionValue} na Globo.com`}
                searchUrl={`http://g1.globo.com/busca/?q=${encodeURIComponent(
                  suggestionValue
                )}`}
                title={`Você será redirecionado para página do Globo.com com a busca ${suggestionValue}`}
              />
              <Divider />
              <SuggestionSearchResultLink
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

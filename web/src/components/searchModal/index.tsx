import { FiChevronRight } from 'react-icons/fi'
import * as S from './styles'

import { Divider } from '../divider'
import { IHighlight, ISuggestion } from '../header/interface'

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
              <S.Header>
                {searchResults.map((result) => (
                  <S.Link
                    key={result.id}
                    href={result.url}
                    title={`Você será redirecionado para página do Globo.com com a busca ${result.title}`}
                  >
                    <S.Logo src={result.logo} alt={result.title} />
                    <S.Name>{result.title}</S.Name>
                  </S.Link>
                ))}
              </S.Header>

              <Divider />

              <S.Wrapper>
                <S.Suggestion>Sugestões de busca</S.Suggestion>
              </S.Wrapper>

              <S.SuggestionsWrapper>
                {suggestions.map((suggestion: ISuggestion) => (
                  <S.SuggestionSearch key={suggestion.id}>
                    <strong>{suggestion.value}</strong>
                  </S.SuggestionSearch>
                ))}
              </S.SuggestionsWrapper>

              <Divider />

              <S.SuggestionsWrapper>
                <S.SuggestionSearch>
                  <S.Link
                    href={`http://g1.globo.com/busca/?q=${encodeURIComponent(
                      suggestionValue
                    )}`}
                    title={`Você será redirecionado para página do Globo.com com a busca ${suggestionValue}`}
                  >
                    buscar <strong>'{suggestionValue}'</strong>na Globo.com
                    <FiChevronRight size={14} />
                  </S.Link>
                </S.SuggestionSearch>
              </S.SuggestionsWrapper>

              <Divider />

              <S.SuggestionsWrapper>
                <S.SuggestionSearch>
                  <S.Link
                    href={`https://www.google.com/search?q=${encodeURIComponent(
                      suggestionValue
                    )}`}
                    title={`Você será redirecionado para página do Google com a busca ${suggestionValue}`}
                  >
                    buscar <strong>'{suggestionValue}'</strong> na Web
                    <FiChevronRight size={14} />
                  </S.Link>
                </S.SuggestionSearch>
              </S.SuggestionsWrapper>
            </>
          )}

          {!hasSearchResults && (
            <S.SearchResultNotFound>
              <small>Nenhum resultado encontrado</small>
            </S.SearchResultNotFound>
          )}
        </S.ContainerModal>
      )}
    </>
  )
}

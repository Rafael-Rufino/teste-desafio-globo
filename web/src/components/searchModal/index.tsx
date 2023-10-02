import { FiChevronRight } from 'react-icons/fi'
import { Divider } from '../divider'
import { IHighlight } from '../header'

import * as S from './styles'

interface SearchModalProps {
  searchResults: IHighlight[]
  suggestions: string[]
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

  const hasValidSuggestionValue = suggestionValue.length > 0

  return (
    <>
      {isOpen && (
        <S.ContainerModal onClick={onClose}>
          {hasSearchResults && (
            <S.Header>
              {searchResults.map((result) => (
                <S.Link
                  key={result.id}
                  href={result.url}
                  title={`Você será redirecionado para página do Globo.com com a busca  ${result.title}`}
                >
                  <S.Logo src={result.logo} alt={result.title} />
                  <S.Name>{result.title}</S.Name>
                </S.Link>
              ))}
            </S.Header>
          )}

          {hasSearchResults && (
            <>
              <Divider />
              <S.Wrapper>
                <S.Suggestion>Sugestões de busca</S.Suggestion>
              </S.Wrapper>

              <S.SuggestionsWrapper>
                {suggestions.map((suggestion) => (
                  <S.SuggestionSearch key={suggestion}>
                    <strong>{suggestion}</strong>
                  </S.SuggestionSearch>
                ))}
              </S.SuggestionsWrapper>

              <Divider />

              {hasValidSuggestionValue && (
                <>
                  <S.SuggestionsWrapper>
                    <S.SuggestionSearch>
                      <S.Link
                        href={`http://g1.globo.com/busca/?q=${encodeURIComponent(
                          suggestionValue
                        )}`}
                        target="_blank"
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
                        target="_blank"
                        title={`Você será redirecionado para página do Google com a busca ${suggestionValue}`}
                      >
                        buscar <strong>'{suggestionValue}'</strong> na Web
                        <FiChevronRight size={14} />
                      </S.Link>
                    </S.SuggestionSearch>
                  </S.SuggestionsWrapper>
                </>
              )}
            </>
          )}

          {!hasSearchResults && (
            <S.SearchResultNotFound>
              Nenhum resultado encontrado
            </S.SearchResultNotFound>
          )}
        </S.ContainerModal>
      )}
    </>
  )
}

import { Divider } from '../divider'
import { IHighlight } from '../header'

import * as S from './styles'

interface ModalProps {
  searchResults: IHighlight[]
  suggestions: string[]
  isOpen: boolean
  onClose: () => void
}

export const Modal = ({
  searchResults,
  suggestions,
  isOpen,
  onClose,
}: ModalProps) => {
  return (
    <S.ContainerModal onClose={onClose} isOpen={isOpen}>
      {searchResults.length > 0 && (
        <S.Header>
          {searchResults.map((result) => (
            <S.Link
              key={result.id}
              href={result.url}
              title={`Você será redirecionado para ${result.title}`}
            >
              <S.Logo src={result.logo} alt={result.title} />
              <S.Title>{result.title}</S.Title>
            </S.Link>
          ))}
        </S.Header>
      )}

      <Divider />

      <S.Wrapper>
        <S.SuggestionSearch>Sugestões de busca</S.SuggestionSearch>
      </S.Wrapper>
      <S.SuggestionsWrapper>
        {suggestions.map((suggestion) => (
          <S.Suggestion key={suggestion}>{suggestion}</S.Suggestion>
        ))}
      </S.SuggestionsWrapper>
    </S.ContainerModal>
  )
}

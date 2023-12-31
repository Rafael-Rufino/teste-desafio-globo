import { ISuggestion } from '../../../../entities'
import * as S from './styles'

interface SearchResultListProps {
  suggestions: ISuggestion[]
}

const SearchResultList = ({ suggestions }: SearchResultListProps) => {
  return (
    <S.Container>
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
    </S.Container>
  )
}

export default SearchResultList

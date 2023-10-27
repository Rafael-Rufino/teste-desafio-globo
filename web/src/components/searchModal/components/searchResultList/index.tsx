import { ISuggestion } from '../../../header/interface'

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
        {suggestions.map((suggestion: ISuggestion, index) => (
          <S.SuggestionSearch key={index}>
            <strong>{suggestion.value}</strong>
          </S.SuggestionSearch>
        ))}
      </S.SuggestionsWrapper>
    </S.Container>
  )
}

export default SearchResultList

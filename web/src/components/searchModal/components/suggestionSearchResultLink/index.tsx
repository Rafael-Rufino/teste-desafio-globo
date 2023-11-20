import * as S from './styles'

interface SuggestionSearchResultLinkProps {
  suggestionValue: string
  searchUrl: string
  title: string
}

const SuggestionSearchResultLink = ({
  suggestionValue,
  searchUrl,
  title,
}: SuggestionSearchResultLinkProps) => {
  return (
    <S.SuggestionsWrapper>
      <S.Container>
        <S.Link href={searchUrl} title={title}>
          buscar <strong>'{suggestionValue}'</strong>
        </S.Link>
      </S.Container>
    </S.SuggestionsWrapper>
  )
}

export default SuggestionSearchResultLink

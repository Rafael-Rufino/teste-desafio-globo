import * as S from './styles'

interface SuggestionSearchLinkProps {
  suggestionValue: string
  searchUrl: string
  title: string
}

const SuggestionSearchLink = ({
  suggestionValue,
  searchUrl,
  title,
}: SuggestionSearchLinkProps) => {
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

export default SuggestionSearchLink

import { IHighlight } from '../../../../entities'
import * as S from './styles'

interface HighlightSearchResultProps {
  highlightSearchResult: IHighlight[]
}

const HighlightSearchResult = ({
  highlightSearchResult,
}: HighlightSearchResultProps) => {
  return (
    <S.Container>
      {highlightSearchResult.map((highlight: IHighlight) => (
        <S.Link
          key={highlight.id}
          href={highlight.url}
          title={`Você será redirecionado para página do Globo.com com a busca ${highlight.title}`}
        >
          <S.Logo src={highlight.logo} alt={highlight.title} />
          <S.Name>{highlight.title}</S.Name>
        </S.Link>
      ))}
    </S.Container>
  )
}

export default HighlightSearchResult
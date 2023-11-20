import { IHighlight } from '../../../../entities'

import * as S from './styles'

interface HighlightSearchResultLinkProps {
  highlightSearchResultLink: IHighlight[]
}

const HighlightSearchResultLink = ({
  highlightSearchResultLink,
}: HighlightSearchResultLinkProps) => {
  return (
    <S.Container>
      {highlightSearchResultLink.map((highlight: IHighlight) => (
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

export default HighlightSearchResultLink

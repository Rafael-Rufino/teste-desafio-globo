import { Divider } from '../divider'

import * as S from './styles'

export const Modal = () => {
  const highlight = {
    title: 'Pop & Art',
    url: 'http://g1.globo.com/pop-arte/index.html',
    logo: 'http://s.glbimg.com/bu/i/fc/5fb2e18d-a47f-4bb8-9a7e-b66871cf53c0.png',
    queries: ['música', 'pop', 'art', 'arte', 'cultura', 'shows'],
  }
  return (
    <S.Container>
      <S.Header>
        <a
          href={highlight.url}
          title={`Você será redirecionado para ${highlight.title}`}
        >
          <S.Logo src={highlight.logo} alt={highlight.title} />
          <S.Title>{highlight.title}</S.Title>
        </a>
      </S.Header>
      <Divider />
      <S.Informative>
        <small>Sugestões de busca</small>
      </S.Informative>
      <S.SearchContent>ssss</S.SearchContent>
    </S.Container>
  )
}

import * as S from './styles'

type SearchInputProps = {
  icon?: JSX.Element
} & React.InputHTMLAttributes<HTMLInputElement>

export const SearchInput = ({ icon, ...rest }: SearchInputProps) => {
  return (
    <S.Container>
      {icon && <S.Icon> {icon}</S.Icon>}
      <S.Input placeholder="Pesquisar" {...rest} />
    </S.Container>
  )
}

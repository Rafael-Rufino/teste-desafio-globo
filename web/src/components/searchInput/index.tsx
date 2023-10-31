import * as S from './styles'
import React from 'react'

type SearchInputProps = {
  icon?: JSX.Element
  inputRef?: React.Ref<HTMLInputElement>
  type?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ icon, type = 'text', ...rest }, ref) => {
    return (
      <S.Container>
        {icon && <S.Icon>{icon}</S.Icon>}
        <S.Input
          placeholder="Digite sua busca"
          type={type}
          ref={ref}
          {...rest}
        />
      </S.Container>
    )
  }
)

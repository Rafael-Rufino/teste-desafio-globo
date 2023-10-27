import * as S from './styles'
import React from 'react'

type SearchInputProps = {
  icon?: JSX.Element
  inputRef?: React.Ref<HTMLInputElement>
} & React.InputHTMLAttributes<HTMLInputElement>

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ icon, inputRef, ...rest }) => {
    return (
      <S.Container>
        {icon && <S.Icon>{icon}</S.Icon>}
        <S.Input placeholder="Digite sua busca" ref={inputRef} {...rest} />
      </S.Container>
    )
  }
)

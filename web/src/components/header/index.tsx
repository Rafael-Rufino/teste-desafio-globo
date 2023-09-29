import { FiSearch } from 'react-icons/fi'

import theme from '../../assets/styles/themes/default'

import { SearchInput } from '../searchInput'

import * as S from './styles'

export const Header = () => {
  return (
    <S.ContainerHeader>
      <SearchInput
        icon={<FiSearch size={24} color={theme.colors.gray.dark} />}
      />
    </S.ContainerHeader>
  )
}

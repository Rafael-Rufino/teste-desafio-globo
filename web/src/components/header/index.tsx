import { FiSearch } from 'react-icons/fi'

import theme from '../../assets/styles/themes/default'

import * as S from './styles'

import { SearchInput } from '../searchInput'
import { SearchModal } from '../searchModal'

import useHeader from './useHeader'

export const Header = () => {
  const {
    closeModalAndResetSearch,
    filteredSuggestionsByQuery,
    isModalVisible,
    highlights,
    handleSearch,
    modalRef,
    query,
    handleArrowKeyNavigation,
  } = useHeader()

  return (
    <S.ContainerHeader>
      <S.Wrapper>
        <S.Logo
          src="http://s.glbimg.com/bu/i/fc/5fb2e18d-a47f-4bb8-9a7e-b66871cf53c0.png"
          alt="Logo do g1"
        />
      </S.Wrapper>
      <S.Content>
        <SearchInput
          type="text"
          value={query}
          onChange={handleSearch}
          icon={<FiSearch size={24} color={theme.colors.gray.dark} />}
          onKeyDown={handleArrowKeyNavigation}
        />
        {isModalVisible && (
          <S.WrapperModal ref={modalRef}>
            <SearchModal
              searchResults={highlights}
              suggestions={filteredSuggestionsByQuery}
              suggestionValue={query}
              isOpen={isModalVisible}
              onClose={closeModalAndResetSearch}
            />
          </S.WrapperModal>
        )}
      </S.Content>
    </S.ContainerHeader>
  )
}

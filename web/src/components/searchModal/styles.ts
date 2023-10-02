import styled from 'styled-components'
import theme from '../../assets/styles/themes/default'

export const ContainerModal = styled.div`
  position: absolute;
  z-index: 1000;
  top: 0;
  margin-top: 170px;

  max-width: 540px;
  width: 100%;

  height: 100%;
  max-height: 500px;
  overflow: hidden;

  border-radius: 8px;
  background: ${theme.colors.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.09);
  padding: 10px 0;

  overflow-y: auto;
`
export const Header = styled.header`
  padding: 20px 20px 0 20px;
`

export const Link = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 0.75rem;
  color: ${theme.colors.gray.light};

  strong {
    color: ${theme.colors.gray.dark};
  }

  :hover {
    opacity: 0.8;
  }
`

export const Name = styled.h1`
  font-size: ${theme.fonts.sizes.xLarge};
  font-weight: ${theme.fonts.weight.bold};
  color: ${theme.colors.gray.dark};
`

export const Logo = styled.img`
  height: 2.5em;
`
export const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  padding: 0px 20px 10px 20px;
`
export const SuggestionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`
export const Suggestion = styled.small`
  color: ${theme.colors.gray.light};
  font-size: ${theme.fonts.sizes.large};
  font-style: italic;

  @media (max-width: 480px) {
    font-size: ${theme.fonts.sizes.medium};
  }
`
export const SuggestionSearch = styled.div`
  font-size: ${theme.fonts.sizes.large};
  color: ${theme.colors.gray.dark};

  @media (max-width: 480px) {
    font-size: ${theme.fonts.sizes.small};
  }
`

export const SearchResultNotFound = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: ${theme.fonts.sizes.xLarge};
  color: ${theme.colors.gray.light};
`

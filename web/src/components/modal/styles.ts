import styled from 'styled-components'
import theme from '../../assets/styles/themes/default'

export const ContainerModal = styled.div`
  position: absolute;
  z-index: 1000;
  top: 0;
  margin-top: 170px;
  max-width: 400px;
  width: 100%;
  height: 400px;
  overflow: hidden;

  border-radius: 8px;
  background: ${theme.colors.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.09);
`
export const Header = styled.header`
  padding: 20px;
`

export const Link = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 0.75rem;

  :hover {
    opacity: 0.8;
  }
`

export const Title = styled.h1`
  font-size: ${theme.fonts.sizes.xLarge};
  font-weight: ${theme.fonts.weight.bold};
  color: ${theme.colors.gray.dark};
`

export const Logo = styled.img`
  height: 40px;
`
export const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  padding: 10px 20px;
`
export const SuggestionSearch = styled.small`
  color: ${theme.colors.gray.light};
  font-size: ${theme.fonts.sizes.xLarge};
`
export const SuggestionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`
export const Suggestion = styled.div`
  font-size: ${theme.fonts.sizes.xLarge};
  color: ${theme.colors.gray.dark};
`

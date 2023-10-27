import styled from 'styled-components'
import theme from '../../../../assets/styles/themes/default'

export const Container = styled.div`
  font-size: ${theme.fonts.sizes.large};
  color: ${theme.colors.gray.dark};
  a {
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: ${theme.fonts.sizes.small};
    a {
      gap: 0.375rem;
    }
  }
`
export const Link = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${theme.colors.gray.light};

  strong {
    color: ${theme.colors.gray.dark};
  }

  :hover {
    opacity: 0.8;
  }
`
export const SuggestionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`

import styled from 'styled-components'
import theme from '../../../../assets/styles/themes/default'

export const Container = styled.header`
  padding: 20px 20px 0 20px;
  a {
    gap: 0.75rem;
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

export const Name = styled.h1`
  font-size: ${theme.fonts.sizes.xLarge};
  font-weight: ${theme.fonts.weight.bold};
  color: ${theme.colors.gray.dark};
`

export const Logo = styled.img`
  height: 2.5em;
`

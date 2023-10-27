import styled from 'styled-components'
import theme from '../../../../assets/styles/themes/default'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: absolute;

  small {
    font-size: ${theme.fonts.sizes.xLarge};
    color: ${theme.colors.gray.light};
  }
`

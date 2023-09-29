import styled from 'styled-components'
import theme from '../../assets/styles/themes/default'

export const ContainerHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${theme.colors.danger.main};
  height: 200px;
  width: 100%;
  padding: 0 20px;
`

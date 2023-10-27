import styled from 'styled-components'
import theme from '../../assets/styles/themes/default'

export const ContainerModal = styled.div`
  position: absolute;
  z-index: 1000;
  top: 0;
  margin-top: 40px;
  min-height: 200px;

  max-width: 540px;
  width: 100%;
  overflow: hidden;

  border-radius: 8px;
  background: ${theme.colors.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.09);
  padding: 10px 0;
`

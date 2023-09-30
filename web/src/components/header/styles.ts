import styled from 'styled-components'
import theme from '../../assets/styles/themes/default'

export const ContainerHeader = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 200px;
  background: ${theme.colors.danger.main};
`

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  width: 100%;
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: flex-end;
`

export const Logo = styled.img`
  display: flex;
  padding: 20px 20px 50px 20px;
`

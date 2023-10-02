import styled from 'styled-components'
import theme from '../../assets/styles/themes/default'

export const Container = styled.div`
  display: flex;
  align-items: center;
  max-width: 540px;
  width: 100%;
  position: relative;
`

export const Icon = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  padding: 0 8px;
`

export const Input = styled.input`
  display: flex;
  height: 52px;
  width: 100%;
  border-radius: 8px;
  border: 2px solid ${theme.colors.white};
  background: ${theme.colors.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 0 16px 0 40px;
  outline: none;
  font-size: ${theme.fonts.sizes.medium};
  transition: border-color 0.2s ease-in;
  appearance: none;
  font-weight: ${theme.fonts.weight.bold};

  &::placeholder {
    font-weight: ${theme.fonts.weight.regular};
  }

  &:focus {
    border: 2px solid ${theme.colors.primary.main};
  }
`

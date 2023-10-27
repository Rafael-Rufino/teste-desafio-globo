import styled from 'styled-components'
import theme from '../../../../assets/styles/themes/default'

export const Container = styled.div``

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

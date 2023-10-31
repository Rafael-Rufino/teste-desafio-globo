import { render, screen } from '@testing-library/react'
import { SearchInput } from './'

describe('<SearchInput />', () => {
  it('should render the SearchInput component', () => {
    render(<SearchInput />)
    const inputElement = screen.getByPlaceholderText('Digite sua busca')
    expect(inputElement)
  })

  it('should render an icon when provided', () => {
    const icon = <span>Icon</span>
    render(<SearchInput icon={icon} />)
    const iconElement = screen.getByText('Icon')
    expect(iconElement)
  })
})

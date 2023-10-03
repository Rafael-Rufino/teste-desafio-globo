import { render } from '@testing-library/react'

import { Divider } from './'

describe('<Divider />', () => {
  it('should render the Divider component', () => {
    const { container } = render(<Divider />)
    expect(container.firstChild).toBeInTheDocument()
  })
})

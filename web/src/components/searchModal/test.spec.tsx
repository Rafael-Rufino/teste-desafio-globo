import { fireEvent, render, waitFor } from '@testing-library/react'
import { SearchModal, SearchModalProps } from './'

const props: SearchModalProps = {
  highlightSearchResult: [
    {
      id: '1',
      title: 'Pop & Art',
      url: 'http://g1.globo.com/pop-arte/index.html',
      logo: 'http://s.glbimg.com/bu/i/fc/5fb2e18d-a47f-4bb8-9a7e-b66871cf53c0.png',
      queries: [
        {
          id: '1',
          value: 'música',
        },
        {
          id: '2',
          value: 'pop',
        },
      ],
    },
  ],
  suggestions: [
    {
      id: '1',
      value: 'música',
    },
    {
      id: '2',
      value: 'futebol',
    },
  ],
  suggestionValue: 'suggestionValue',
  isOpen: true,
  onClose: jest.fn(),
}

test('should close modal when clicking outside', async () => {
  const { queryByRole } = render(<SearchModal {...props} />)

  const modal = queryByRole('modal')

  fireEvent.click(modal as HTMLElement)

  const handleClose = props.onClose

  await waitFor(() => {
    expect(handleClose).toHaveBeenCalled()
  })
})

test('renders SearchModal component without highlight search results', () => {
  const noResultsProps: SearchModalProps = {
    ...props,
    highlightSearchResult: [],
  }
  const { getByText } = render(<SearchModal {...noResultsProps} />)
  expect(getByText('Nenhum resultado encontrado'))
})

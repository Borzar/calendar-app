import { render, screen, waitFor } from '@testing-library/react'
import { MenuTop } from './MenuTop'
import { MemoryRouter } from 'react-router-dom'
import { getNameUser } from '../../../services/apiServices'

jest.mock('../../../services/apiServices')

describe('<MenuTop />', () => {
  it('render the username in the screen', async () => {
    render(
      <MemoryRouter>
        <MenuTop />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(getNameUser).toHaveBeenCalled()
    })
  })

  it('render logout text in the MenuTop component', async () => {
    render(
      <MemoryRouter>
        <MenuTop />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByText(/logout/i)).toBeInTheDocument()
    })
  })

  it('render the `MenuTop` component', async () => {
    render(
      <MemoryRouter>
        <MenuTop />
      </MemoryRouter>
    )
    await waitFor(() =>
      expect(screen.getByTestId('menu-top')).toBeInTheDocument()
    )
  })
})

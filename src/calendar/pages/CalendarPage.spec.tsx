import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { getNameUser } from '../../services'
import { CalendarPage } from './CalendarPage'

jest.mock('../../services/apiServices')

describe('<CalendarPage />', () => {
  it('should render the calendar page when is active', async () => {
    render(
      <MemoryRouter>
        <CalendarPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('button', { name: /today/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /month/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /week/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Day' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /agenda/i })).toBeInTheDocument()
    expect(
      screen.getByRole('table', { name: /month view/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('row', {
        name: /sunday monday tuesday wednesday thursday friday saturday/i,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('row', {
        name: /sunday monday tuesday wednesday thursday friday saturday/i,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', { name: /sunday/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', { name: /monday/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', { name: /tuesday/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', { name: /wednesday/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', { name: /thursday/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', { name: /friday/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', { name: /saturday/i })
    ).toBeInTheDocument()
  })

  it('should render the events page when is active', async () => {
    render(
      <MemoryRouter>
        <CalendarPage />
      </MemoryRouter>
    )
    userEvent.click(screen.getByRole('button', { name: /events/i }))
    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: /new event/i,
          level: 3,
        })
      )
      expect(screen.getByText(/initial date/i)).toBeInTheDocument()
      expect(screen.getByText(/final date/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/notes/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /done/i })).toBeInTheDocument()
      expect(
        screen.getByRole('columnheader', { name: /id/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('columnheader', { name: /title/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('columnheader', { name: /notes/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('columnheader', { name: /start/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('columnheader', { name: /end/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('columnheader', { name: /actions/i })
      ).toBeInTheDocument()
    })
  })

  it('should render `Menu` in the screen', async () => {
    render(
      <MemoryRouter>
        <CalendarPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('button', { name: /events/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /calendar/i })
    ).toBeInTheDocument()
  })

  it('should render `MenuTop` in the screen ', async () => {
    render(
      <MemoryRouter>
        <CalendarPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument()
    expect(getNameUser).toHaveBeenCalledTimes(1)
  })
})

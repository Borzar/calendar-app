import { MemoryRouter } from 'react-router-dom'
import { CalendarModal } from './CalendarModal'
import {
  render,
  screen,
  within,
} from '@testing-library/react'

const updateDataMock = jest.fn()
const currentDataMock = jest.fn()

describe('<CalendarModal />', () => {
  it('render the `CalendarModal` in the screen', () => {
    render(
      <MemoryRouter>
        <CalendarModal
          updateData={updateDataMock}
          currentData={currentDataMock}
        />
      </MemoryRouter>
    )
    expect(screen.getByText(/initial date/i)).toBeInTheDocument()
    expect(screen.getByText(/final date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument()
    within(screen.getByRole('button', { name: /edit/i })).getByText(/edit/i)
  })
})

import { MemoryRouter } from 'react-router-dom'
import { CalendarModal } from './CalendarModal'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import { addHours } from 'date-fns'
import { act } from 'react-dom/test-utils'
import { updateApiEvent } from '../../../services'

const updateDataMock = jest.fn()
const currentDataMock = jest.fn()

jest.mock('../../../services/apiServices.ts')

describe('<CalendarModal />', () => {
  it('should update form in modal', async () => {
    const myCurrentDataMock = {
      title: 'note title',
      start: new Date(),
      end: addHours(new Date(), 1),
      notes: 'notes',
    }
    render(
      <MemoryRouter>
        <CalendarModal
          updateData={updateDataMock}
          currentData={myCurrentDataMock}
        />
      </MemoryRouter>
    )
    const formField = screen.getByRole('form', { name: 'modal-form' })
    act(() => {
      fireEvent.submit(formField)
    })
    await waitFor(() => {
      expect(updateApiEvent).toHaveBeenCalledTimes(1)
    })
  })

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

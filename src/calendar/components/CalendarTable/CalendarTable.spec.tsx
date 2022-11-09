import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CalendarTable } from './CalendarTable'

const editFormValuesMock = jest.fn()
const deleteEventMock = jest.fn()

describe('<CalendarTable />', () => {
  it('should call delete event when is click delete button', async () => {
    const myEventsMock = [
      {
        id: '1234',
        title: 'Event title',
        notes: 'my notes',
        start: Date,
        end: Date,
      },
    ]
    render(
      <CalendarTable
        myEvents={myEventsMock}
        deleteEvent={deleteEventMock}
        editFormValues={editFormValuesMock}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: /delete/i }))
    expect(deleteEventMock).toHaveBeenCalledTimes(1)
  })

  it('should call edit event when is click edit button', async () => {
    const myEventsMock = [
      {
        id: '1234',
        title: 'Event title',
        notes: 'my notes',
        start: 'initial date',
        end: 'end date',
      },
    ]
    render(
      <CalendarTable
        myEvents={myEventsMock}
        deleteEvent={deleteEventMock}
        editFormValues={editFormValuesMock}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: /edit/i }))
    expect(editFormValuesMock).toHaveBeenCalledTimes(1)
  })

  it('should render the headers when there are not events', async () => {
    render(
      <CalendarTable
        deleteEvent={deleteEventMock}
        editFormValues={editFormValuesMock}
      />
    )
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

  it('render the `CalendarTable` component', async () => {
    const myEventsMock = [
      {
        id: '1234',
        title: 'Event title',
        notes: 'my notes',
        start: 'initial date',
        end: 'end date',
      },
    ]

    render(
      <CalendarTable
        myEvents={myEventsMock}
        deleteEvent={deleteEventMock}
        editFormValues={editFormValuesMock}
      />
    )
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
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })
})

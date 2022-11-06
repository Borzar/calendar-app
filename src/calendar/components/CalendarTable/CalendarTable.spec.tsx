import { render, screen } from '@testing-library/react'
import { CalendarTable } from './CalendarTable'

describe('<CalendarTable />', () => {
  it('render the `CalendarTable` component', async () => {
    render(<CalendarTable />)
    expect(screen.getByRole('columnheader', { name: 'id' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'title' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'notes' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'start' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'end' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'actions' })).toBeInTheDocument()
  })
})

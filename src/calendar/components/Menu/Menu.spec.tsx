import { render, screen } from '@testing-library/react'
import { Menu } from './Menu'

describe('<Menu />', () => {
  it('render the `Menu` component', () => {
    render(<Menu />)
    expect(screen.getByRole('button', { name: 'events' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'calendar' })).toBeInTheDocument()
  })
})

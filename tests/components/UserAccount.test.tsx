import { render, screen } from '@testing-library/react'
import UserAccount from '../../src/components/UserAccount'
import type { User } from '../../src/entities';

describe('UserAccount', () => {
  // Test render the component into a Virtual DOM implemented by jsdom
  it('should render user name', () => {
    const user: User = { id: 1, name: 'Andy', isAdmin: false }
    render(<UserAccount user={user} />)

    // Find an element with the text Andy
    const el = screen.getByText(/andy/i)
    expect(el).toBeInTheDocument()
  });

  // Test passing an admin user and checking if the button is in the DOM
  it('should render the edit button if user is an admin', () => {
    render(<UserAccount user={{ id: 1, name: 'Andy', isAdmin: true }} />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(/edit/i)
  })

  // Test passing a non-admin user and checking if the button is not in the DOM
  it('should not render the edit button if user is not an admin', () => {
    render(<UserAccount user={{ id: 1, name: 'Andy', isAdmin: false }} />)

    // Div's has no roles and the button is not in the document, so we have to query it
    const button = screen.queryByRole('button')
    expect(button).not.toBeInTheDocument()
  })
})
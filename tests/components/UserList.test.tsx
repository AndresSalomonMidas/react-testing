import { render, screen } from '@testing-library/react'
import UserList from '../../src/components/UserList'
import type { User } from '../../src/entities'

describe('UserList', () => {
  it('should render no user when the users array is empty', () => {
    render(<UserList users={[]} />)
    
    // As p elements doesn't have a role, we have to get the text content
    const el = screen.getByText(/no users/i)
    expect(el).toBeInTheDocument()
  })

  it('should render a list of users', () => {
    const users: User[] = [
      { id: 1, name: 'Andy', isAdmin: false },
      { id: 2, name: 'Bob', isAdmin: true }
    ]

    render(<UserList users={users} />)

    users.forEach((user) => {
      const link = screen.getByRole('link', { name: user.name })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', `/users/${user.id}`)
    })
  })
})
import { render, screen } from '@testing-library/react'
import Greet from '../../src/components/Greet'

describe('Greet', () => {
  it('should render Hello with the name when name is provided', () => {
    // Render the component into a Virtual DOM implemented by jsdom
    render(<Greet name="Andy" />)

    // Find an element with the text Andy
    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(/andy/i)
  });

  it('should render login button when name is not provided', () => {
    render(<Greet />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(/login/i)
  });
})
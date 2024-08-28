import { render, screen } from '@testing-library/react'
import ExpandableText from '../../src/components/ExpandableText'
import userEvent from '@testing-library/user-event';

describe('ExpandableText', () => {
  const limit = 255;
  const longText = 'a'.repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + '...';

  it('should render whole text if length is less than 255 characters', () => {
    const testText = 'short text'
    
    render(<ExpandableText text={testText} />)

    const text = screen.getByText(testText)
    expect(text).toBeInTheDocument()
  });

  it('should truncate text if it is longer than 255 characters', () => {
    render(<ExpandableText text={longText} />)

    expect(screen.getByText(truncatedText)).toBeInTheDocument()
    const button = screen.getByRole('button')
    // The follow assertion is not necessary, as if there isn't a button, getByRole will fail
    // expect(button).toBeInTheDocument() 
    expect(button).toHaveTextContent(/more/i)
  });

  // Expanding
  it('should expand text when Show More button is clicked', async () => {
    render(<ExpandableText text={longText} />)

    const button = screen.getByRole('button')
    const user = userEvent.setup()
    await user.click(button)

    expect(screen.getByText(longText)).toBeInTheDocument()
    expect(button).toHaveTextContent(/less/i)
  });

  // Collapsing
  it('should collapse text when Show Less button is clicked', async () => {
    // Arrange
    render(<ExpandableText text={longText} />)
    const showMoreButton = screen.getByRole('button', { name: /more/i })
    const user = userEvent.setup()
    await user.click(showMoreButton)

    // Act - Should click the button again to test it correctly
    const showLessButton = screen.getByRole('button', { name: /less/i })
    await user.click(showLessButton)

    // Assert
    expect(screen.getByText(truncatedText)).toBeInTheDocument()
    expect(showMoreButton).toHaveTextContent(/more/i)
  });
})
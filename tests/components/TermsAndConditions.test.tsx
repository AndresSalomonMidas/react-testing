import { render, screen } from '@testing-library/react'
import TermsAndConditions from '../../src/components/TermsAndConditions'
import userEvent from '@testing-library/user-event';

describe('TermsAndConditions', () => {
  // Helper function
  const renderComponents = () => {
    render(<TermsAndConditions />);

    // Return elements to query
    return {
      heading: screen.getByRole('heading'),
      checkbox: screen.getByRole('checkbox'),
      button: screen.getByRole('button'),
    }
  }

  it('should render with the correct text and initial state', () => {
    const { heading, checkbox, button } = renderComponents();

    // Only look at the heading, checkbox and a disabled button
    // Not necessary to check if the elements are in the document..
    // ..as it will fail if the element is not there
    // expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Terms & Conditions')
    // expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()
    // expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(/submit/i)
    expect(button).toBeDisabled()
  });

  // User interactions
  it('should enable the button when the checkbox is checked', async () => {
    // Arrange
    const { checkbox, button } = renderComponents();
    
    // Act
    const user = userEvent.setup()
    await user.click(checkbox)

    // Assert
    expect(button).toBeEnabled()
  })
})
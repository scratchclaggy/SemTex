import ButtonConsole from "../src/components/admin/ButtonConsole"
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

test('contain button console', async () => {
  // ARRANGE
  render(<ButtonConsole />)

  // ACT
  //await userEvent.click(screen.getByText('Load Greeting'))
  //await screen.findByRole('heading')

  // ASSERT
  //expect(screen.getByRole('div')).toHaveTextContent('Button Console')
  const linkElement = screen.getByText('Button Console');
  expect(linkElement).toBeInTheDocument();

})
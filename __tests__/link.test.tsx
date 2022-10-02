import Link from "../src/components/ui/Link"
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

test('loads and displays greeting', async () => {
  // ARRANGE
  render(<Link href="/www.google.com" label="labeling"/>)

  // ACT
  //await userEvent.click(screen.getByText('Load Greeting'))
  //await screen.findByRole('heading')

  // ASSERT
  //expect(screen.getByRole('href')).toHaveTextContent('/greeting')
  const linkElement = screen.getByText("labeling");
  //const linkElement2 = screen.getByText("/greeting");
  expect(linkElement).toBeInTheDocument();
  //expect(linkElement2).toBeInTheDocument();
  //expect(screen.getByRole('button')).toBeDisabled()
  expect(screen.getByRole('link')).toHaveAttribute('href', '/www.google.com')
})
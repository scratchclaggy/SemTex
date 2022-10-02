import Search from "../src/components/admin/Search"
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

test('contain button console', async () => {
  // ARRANGE
  
  render(<Search />)

  const linkElement = screen.getByText('Search');
  expect(linkElement).toBeInTheDocument();

})
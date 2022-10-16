import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "../src/components/ui/Header.tsx"

let mockFunction
jest.mock('../src/contexts/AuthContext', () => () => {
  mockFunction = jest.fn(() => 2)
  return {
      user:'user',
      authError:null,
      signOut:true
  }
});

test("loads and displays Sign out", async () => {
  render(<Header />)
  const linkElement = screen.getByText("Sign Out");
  expect(linkElement).toBeInTheDocument();

});

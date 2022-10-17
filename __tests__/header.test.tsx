import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "../src/components/ui/Header";

jest.mock("../src/contexts/AuthContext", () => () => {
  const mockFunction = jest.fn(() => 2);
  return {
    user: { user_metadata: { isAdmin: false } },
    authError: null,
    signOut: () => {},
  };
});

test("loads and displays Sign out", async () => {
  render(<Header />);
  const linkElement = screen.getByText("Sign Out");
  expect(linkElement).toBeInTheDocument();
});

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Search from "../src/components/admin/Search";

test("contain button console", async () => {
  render(<Search />);

  const linkElement = screen.getByText("Search");
  expect(linkElement).toBeInTheDocument();
});

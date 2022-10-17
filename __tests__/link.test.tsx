import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Link from "../src/components/ui/Link";

test("loads and displays greeting", async () => {
  render(<Link href="/www.google.com" label="labeling" />);
  const linkElement = screen.getByText("labeling");
  expect(linkElement).toBeInTheDocument();
  expect(screen.getByRole("link")).toHaveAttribute("href", "/www.google.com");
});

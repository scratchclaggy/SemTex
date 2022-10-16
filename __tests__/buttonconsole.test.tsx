import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ButtonConsole from "../src/components/admin/ButtonConsole.tsx";

test("contain button console", async () => {
  render(<ButtonConsole />);
  const linkElement = screen.getByText("Button Console");
  expect(linkElement).toBeInTheDocument();
});

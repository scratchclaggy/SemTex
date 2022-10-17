import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProgressBar from "../src/components/semtex/Progress";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: { datasetID: undefined },
      asPath: "",
    };
  },
}));
jest.mock("../src/contexts/AuthContext", () => () => {
  mockFunction = jest.fn(() => 2);
  return {
    user: "user",
    authError: null,
    signOut: true,
  };
});
let mockFunction;
jest.mock("../src/hooks/user_response_list", () => () => {
  mockFunction = jest.fn(() => 2);
  return {
    user: "user",
    authError: null,
    signOut: true,
    response: { response: { length: 0 } },
    length: 100,
  };
});

test("Shows 0% progress when user response list is empty", async () => {
  render(<ProgressBar />);

  const linkElement = screen.getByText("0%");
  expect(linkElement).toBeInTheDocument();
});

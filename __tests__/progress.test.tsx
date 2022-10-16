import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProgressBar from "../src/components/semtex/Progress";
import { useRouter } from "next/router";
import * as data from "../src/hooks/user_responses";

jest.mock("next/router", () => ({
	useRouter() {
	    return {
		route: "/",
		pathname: "",
		query: {datasetID:undefined},
		asPath: "",
	    };
	},
    }));
let mockFunction
jest.mock('../src/hooks/user_responses', () => () => {
	mockFunction = jest.fn(() => 2)
	return {
	    user:'user',
	    authError:null,
	    signOut:true,
	    response:{response:{length:0}},
	    length:100
	}
      });

test("has 0 percent", async () => {
  render(<ProgressBar />);
 
  const linkElement = screen.getByText("0%");
  expect(linkElement).toBeInTheDocument();
});
import { Dispatch, SetStateAction } from "react";
import ResponseButtons from "./ResponseButtons";
import ResponseDropdown from "./ResponseDropdown";

export type ResponseSelectorProps = {
  responses: string[];
  currentResponse: string | null;
  setCurrentResponse: Dispatch<SetStateAction<string | null>>;
};

const ResponseSelector = ({
  responses,
  currentResponse,
  setCurrentResponse,
}: ResponseSelectorProps) => {
  return responses.length > 5 ? (
    <ResponseDropdown
      responses={responses}
      currentResponse={currentResponse}
      setCurrentResponse={setCurrentResponse}
    />
  ) : (
    <ResponseButtons
      responses={responses}
      currentResponse={currentResponse}
      setCurrentResponse={setResponse}
    />
  );
};

export default ResponseSelector;

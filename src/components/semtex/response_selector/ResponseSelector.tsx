import { dataset } from "../Semtex";
import ResponseButtons from "./ResponseButtons";
import ResponseDropdown from "./ResponseDropdown";

const ResponseSelector = () => {
  // TODO: Retrieve the dataset via SWR
  const responses = dataset.responses;

  return responses.length > 5 ? <ResponseDropdown /> : <ResponseButtons />;
};

export default ResponseSelector;

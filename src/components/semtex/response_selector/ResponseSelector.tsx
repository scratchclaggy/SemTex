import useAuth from "src/contexts/AuthContext";
import { useDataset } from "src/hooks/db";
import ResponseButtons from "./ResponseButtons";
import ResponseDropdown from "./ResponseDropdown";

const ResponseSelector = () => {
  const { user } = useAuth();
  const { dataset } = useDataset(user?.user_metadata.dataset);

  if (!dataset) {
    return null;
  }

  const responses = dataset.responseOptions;

  return responses.length > 5 ? <ResponseDropdown /> : <ResponseButtons />;
};

export default ResponseSelector;

import { useRouter } from "next/router";
import useDataset from "src/hooks/dataset";
import ResponseButtons from "./ResponseButtons";
import ResponseDropdown from "./ResponseDropdown";
import { Box } from "@mui/material";

const ResponseSelector = () => {
  const router = useRouter();
  const { dataset } = useDataset(router.query.datasetID as string | undefined);

  const responses = dataset?.responseOptions ?? [];

  return (
   <Box
   sx={{
    backgroundColor: "white",
    borderRadius: "16px"
   }}
   >
      {responses.length > 5 ? <ResponseDropdown /> : <ResponseButtons />}
   </Box> 
  )
};

export default ResponseSelector;

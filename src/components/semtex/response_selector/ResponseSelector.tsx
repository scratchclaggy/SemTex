import { Box } from "@mui/material";
import { useRouter } from "next/router";
import useDataset from "src/hooks/dataset";
import ResponseButtons from "./ResponseButtons";
import ResponseDropdown from "./ResponseDropdown";

const ResponseSelector = () => {
  const router = useRouter();
  const { dataset } = useDataset(router.query.datasetID as string | undefined);

  const responses = dataset?.responseOptions ?? [];

  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F0",
        borderRadius: "16px",
      }}
    >
      {responses.length > 5 ? <ResponseDropdown /> : <ResponseButtons />}
    </Box>
  );
};

export default ResponseSelector;

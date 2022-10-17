import { Box, Typography } from "@mui/material";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import useDataset from "src/hooks/dataset";
import { textSampleIndexAtom } from "./Semtex";

const TextSample = () => {
  const router = useRouter();
  const { dataset } = useDataset(router.query.datasetID as string | undefined);
  const textSampleIndex = useAtomValue(textSampleIndexAtom);

  const textSample = dataset?.textSamples[textSampleIndex]?.body ?? "";

  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F0",
        height: "40vh",
        borderRadius: "16px",
        padding: "10px",
        overflowY: "scroll",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Typography fontFamily="Roboto Mono" fontSize="24px">
        {textSample}
      </Typography>
    </Box>
  );
};

export default TextSample;

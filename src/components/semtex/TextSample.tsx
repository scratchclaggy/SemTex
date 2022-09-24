import { Box, Typography } from "@mui/material";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import useDataset from "src/hooks/dataset";
import { textSampleIndexAtom } from "./Semtex";
import { useState } from "react";

const TextSample = () => {
  const router = useRouter();
  const { dataset } = useDataset(router.query.datasetID as string | undefined);
  const textSampleIndex = useAtomValue(textSampleIndexAtom);
  
  const textSample = dataset?.textSamples[textSampleIndex]?.body ?? "";

  const base = {start: 0, end: textSample.length, value: textSample}
  
  const [markup, setMarkup] = useState([textSample])

  type highlightData = {
    start: number,
    end: number,
    value: string
  }

  const handleMouseUp = () => {
    const selObj = window.getSelection()

    if(selObj != null && selObj.focusNode == selObj.anchorNode){

      let start = selObj.anchorOffset
      let end = selObj.focusOffset

      console.log()
    }
    console.log("test")
  }

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
      <Typography onMouseUp={handleMouseUp}fontFamily="Roboto Mono" fontSize="24px">
        {markup}
      </Typography>
    </Box>
  );
};

export default TextSample;

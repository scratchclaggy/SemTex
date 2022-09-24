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

  const highlightMap = [{start: 0, end: textSample.length, value: textSample}]
  
  const [markup, setMarkup] = useState([textSample])
  const [atom, setAtom] = useState<string | null>(null)

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

      // Make it so the user can highlight backwards
      if(start > end){
        let temp = start
        start = end
        end = temp
      }
      
      const newSelection: highlightData = {start: start, end: end, value: selObj.toString()}

      highlightMap.find((item, index) => {
        // When we find the element which the selection enters in the middle of
        if(start > item.start && end < item.end){
          const newBefore: highlightData = {start: item.start, end: start-1,
          value: textSample.substring(item.start, start-1)}
          const newAfter: highlightData = {start: end+1, end: item.end, 
          value: textSample.substring(end+1, item.end)}
          
          highlightMap.splice(index, 1)
          highlightMap.push(newBefore)
          highlightMap.push(newSelection)
          highlightMap.push(newAfter)
        }

        // If the selection we choose is at the start of the text sample
        else if(start == item.start && end < item.end){
          const newAfter: highlightData = {start: end+1, end: item.end, 
            value: textSample.substring(end+1, item.end)}

          highlightMap.splice(index, 1)
          highlightMap.push(newSelection)
          highlightMap.push(newAfter)
        }

        // If the selection we choose is at the end of the text sample
        else if(start > item.start && end == item.end){
          const newBefore: highlightData = {start: item.start, end: start-1,
            value: textSample.substring(item.start, start-1)}

          highlightMap.splice(index, 1)
          highlightMap.push(newBefore)
          highlightMap.push(newSelection)
        }

        console.log(highlightMap)
      })
    }
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
        { atom ? "Testing" : markup}
      </Typography>
    </Box>
  );
};

export default TextSample;

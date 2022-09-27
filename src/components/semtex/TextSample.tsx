import { Box, Typography } from "@mui/material";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import useDataset from "src/hooks/dataset";
import { textSampleIndexAtom } from "./Semtex";
import { useState } from "react";
import { highlightAtom } from "./Highlighters";

const TextSample = () => {
  const router = useRouter();
  const { dataset } = useDataset(router.query.datasetID as string | undefined);
  const textSampleIndex = useAtomValue(textSampleIndexAtom);
  const textSample = dataset?.textSamples[textSampleIndex]?.body ?? "";

  const highlightMap: highlightData[] = [{start: 0, end: textSample.length, color: null, value: textSample}]
  
  const [markup, setMarkup] = useState([textSample])
  const [highlightmarkup, setHighlightMarkup] = useState([textSample])

  const highlightState = null;

  // Start and End are the beginning and end of each section, value is the
  // value of the selection. Color is the highlighter color or lack therof. 
  type highlightData = {
    start: number,
    end: number,
    color: string | null,
    value: string
  }

  // --------------------------------- Function for Comparing Highlight Indicies ----------------------
  const compareStart = (a: highlightData, b: highlightData) => {
    if (a.start < b.start){
      return -1;
    }
    if(a.start > b.start){
      return 1;
    }
    return 0;
  }

// ------------------------------------ Function For Handling Sorting the Highlights ------------------

  // Constructs the highlighter state using the given sorted highlightMap. 
  const constructText = (map: highlightData[]) => {
    const output: object[] = []
    
    map.forEach((item) => {
      // If the item is plain text, put it in a span
      if(item.color == null){
        output.push(<span>{item.value}</span>)
      }
      // If the item is a highlight, put it in a mark with the corresponding 
      // color
      else{
        output.push(<mark>{item.value}</mark>)
      }
    })

    return output
  }

// -------------------------------------- Function For Handling the Highlight --------------------------
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
      
      const newSelection: highlightData = {start: start, end: end, color: "blue", value: selObj.toString()}

      highlightMap.find((item, index) => {
        // When we find the element which the selection enters in the middle of.
        if(start > item.start && end < item.end){
          const newBefore: highlightData = {start: item.start, end: start-1, color: item.color,
          value: textSample.substring(item.start, start-1)}
          const newAfter: highlightData = {start: end+1, end: item.end, color: item.color,
          value: textSample.substring(end+1, item.end)}
          
          highlightMap.splice(index, 1)
          highlightMap.push(newBefore)
          highlightMap.push(newSelection)
          highlightMap.push(newAfter)
        }

        // If the selection we choose is at the start of the text sample.
        else if(start == item.start && end < item.end){
          const newAfter: highlightData = {start: end+1, end: item.end, color: item.color,
            value: textSample.substring(end+1, item.end)}

          highlightMap.splice(index, 1)
          highlightMap.push(newSelection)
          highlightMap.push(newAfter)
        }

        // If the selection we choose is at the end of the text sample.
        else if(start > item.start && end == item.end){
          const newBefore: highlightData = {start: item.start, end: start-1, color: item.color,
            value: textSample.substring(item.start, start-1)}

          highlightMap.splice(index, 1)
          highlightMap.push(newBefore)
          highlightMap.push(newSelection)
        }

        // Sorts the array each time we call the function. 
        highlightMap.sort(compareStart)
        const test = constructText(highlightMap)
        setHighlightMarkup(test)

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
        {highlightState ? highlightmarkup : markup}
      </Typography>
    </Box>
  );
};

export default TextSample;

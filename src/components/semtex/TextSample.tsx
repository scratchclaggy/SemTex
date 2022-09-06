import { Box, Typography } from "@mui/material";
import { useState } from "react";

const TextSample = () => {
  const [text, setText] = useState("Lorem ipsum dolor sit amet consectetur")
  const test = [<mark>Testing</mark>, <Typography>Second Test</Typography>]

  const highlighterHandler = () =>{
    const selObj = window.getSelection()
    const selText = selObj.toString()
    

    // This will be replaced with a function to export the saved text
    // Currently this hands out ANY highlighted text, provided you release the mouse
    // within the range of the Box. 
    console.log(selText);
  }

  return (
    <Box
    style={{
      border:'solid',
      borderWidth: '1px',
      margin: '4px',
      padding: '4px'
    }}
    >
      <Typography onMouseUp={highlighterHandler}>{test}</Typography>
    </Box>
  );
};

export default TextSample;

import { Box, Typography } from "@mui/material";
import { useState } from "react";

const TextSample = () => {
  const text = "Lorem ipsum dolor sit amet consectetur"
  const [markup, setMarkup] = useState(text)
  
  const output: any = []
  
  // Function checks the location of the downclick to find 
  // which child element we begin in.
  const downClickHandler = (el: any) =>{
    const i = output.from(el.parentNode.children).indexOf(el)
    console.log(i)
  }

  // Function handles the highlighted text, highlighting it 
  // and updating the necessary variables. 
  const highlighterHandler = () =>{
    const selObj = window.getSelection()
    
    if(selObj != null){
      let start: number = selObj.anchorOffset
      let end: number = selObj.focusOffset

      // Allow the user to highlight text backwards
      if(start > end){
        let temp = end
        end = start
        start = temp
      }

      const before= text.substring(0, start)
      const after = text.substring(end, text.length)
      const select = selObj.toString()

      output.push(<span>{before}</span>)
      output.push(<mark>{select}</mark>)
      output.push(<span>{after}</span>)
      
      setMarkup(output)
    
    }
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
       <Typography onMouseDown={downClickHandler} onMouseUp={highlighterHandler}>{markup}</Typography>
    </Box>
  );
};

export default TextSample;

import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

const TextSample = () => {
  const text = "Lorem ipsum dolor sit amet consectetur"
  const [markup, setMarkup] = useState(text)
  const [selection, setSelection] = useState('')
  const [beforeSelection, setBeforeSelection] = useState('')
  const [afterSelection, setAfterSelection] = useState('')


  const output: any = [] 

  useEffect(() => {
      
  }, [afterSelection])




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

      setBeforeSelection(before)
      setAfterSelection(after)
      setSelection(select)
      
    }
    output.push(beforeSelection)
    output.push(<mark>{selection}</mark>)
    output.push(afterSelection)

    setMarkup(output)
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
      <Typography onMouseUp={highlighterHandler}>{markup}</Typography>
    </Box>
  );
};

export default TextSample;

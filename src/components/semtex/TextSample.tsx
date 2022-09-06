import { Box, Typography } from "@mui/material";

const TextSample = () => {

  const highlighterHandler = () =>{
    const selObj = window.getSelection();
    const selText = selObj.toString();

    // This will be replaced with a function to export the saved text
    console.log(selText);
  }

  const text = "Lorem ipsum dolor sit amet consectetur"
  return (
    <Box
    style={{
      border:'solid',
      borderWidth: '1px',
      margin: '4px',
      padding: '4px'
    }}
    >
      <Typography onMouseUp={highlighterHandler}>{text}</Typography>
    </Box>
  );
};

export default TextSample;

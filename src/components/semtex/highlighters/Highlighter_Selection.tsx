import { Button } from "@mui/material";
import React from "react";
import  { HighlightOption } from "src/types/client";
const Highlighter_Selection = ( highlighter: HighlightOption) => {
  const styleColor = highlighter.color.toString()

  return (
    <Button
    fullWidth
    
    style={{
      color: "white",
      textShadow: "1px 0 0 black, 0 -1px 0 black, 0 1px 0 black, -1px 0 0 black",
      background: styleColor,
      active: "blue"
    }}
    >{highlighter.label}</Button>
  );
};

export default Highlighter_Selection;
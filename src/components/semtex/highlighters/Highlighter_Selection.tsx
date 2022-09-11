import { Button } from "@mui/material";
import React from "react";
import  { HighlightOption } from "src/types/client";
const Highlighter_Selection = ( highlighter: HighlightOption) => {
  const styleColor = highlighter.color.toString()

  return (
    <Button
    style={{
      width: "100%",
      color: "white",
      textShadow: "1px 0 0 black, 0 -1px 0 black, 0 1px 0 black, -1px 0 0 black",
      background: styleColor
    }}
    >{highlighter.label}</Button>
  );
};

export default Highlighter_Selection;
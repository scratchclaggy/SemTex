import RectangleIcon from "@mui/icons-material/Rectangle";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Color, PhotoshopPicker, SketchPicker } from "react-color";
import { useFormContext } from "react-hook-form";

const ColorPicker = () => {
  const [color, setColor] = useState<Color>("#FF0000");
  const [display, setDisplay] = useState(false);

  const handleChange = (color: Color) => {
    setColor(color);
  };

  const handleDisplay = () => {
    setDisplay(!display);
  };

  return (
    <Stack direction="row" alignItems="center">
      <Typography>Select Color:</Typography>
      <Button onClick={handleDisplay}>
        <RectangleIcon fontSize="large" sx={{ color: {color} }} />
      </Button>
      {display && (
        <Box style={{ position: "absolute", marginTop: "380px", zIndex: 1000 }}>
          <PhotoshopPicker
            header="Highlighter Colour"
            color={color}
            onChange={(color) => handleChange(color.hex)}
          />
        </Box>
      )}
    </Stack>
  );
};
export default ColorPicker;

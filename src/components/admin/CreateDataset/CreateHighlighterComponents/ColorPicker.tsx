import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { PhotoshopPicker } from 'react-color';
import RectangleIcon from '@mui/icons-material/Rectangle';

const ColorPicker = () => {
  const [color, setColor] = useState("#ff0000")
  const [display, setDisplay] = useState(false)


  const handleColorChange = (color:string) => {
    setColor(color)
  }

  const handleDisplay = () => {
    setDisplay(!display)
  }

  return (
    <Stack direction="row" alignItems="center">
      <Typography>
        Select Color: 
      </Typography>
      <Button  onClick={handleDisplay}>
        <RectangleIcon fontSize="large" sx={{backgroundColor:{color}}}/>
      </Button>
      {display && (
        <Box style={{position: "absolute", marginTop: "380px", zIndex: 1000}}>
          <PhotoshopPicker
          header="Highlighter Colour"
          color={color}
          onChange={(color) => handleColorChange(color.hex)}
          />
        </Box>
      )}
    </Stack>
    );
};
export default ColorPicker;
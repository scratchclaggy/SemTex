import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { PhotoshopPicker } from 'react-color';
import RectangleIcon from '@mui/icons-material/Rectangle';

const ColorPicker = () => {
  const [rectangle, setRectangle] = useState("#FF0000")
  const [color, setColor] = useState("#FF0000")
  const [display, setDisplay] = useState(false)

  const handleColorChange = (color:string) => {
    setColor(color)
  }

  const handleDisplay = () => {
    setDisplay(!display)
  }

  const handleAccept = () => {
    setDisplay(!display)
  }

  const handleCancel = () => {
    setDisplay(!display)
  }

  return (
    <Stack direction="row" alignItems="center">
      <Typography>
        Select Color: 
      </Typography>
      <Button  onClick={handleDisplay}>
        <RectangleIcon fontSize="large" sx={{color:{color}}}/>
      </Button>
      {display && (
        <Box style={{position: "absolute", marginTop: "380px", zIndex: 1000}}>
          <PhotoshopPicker
          header="Highlighter Colour"
          color={color}
          onChange={(color) => handleColorChange(color.hex)}
          onAccept={handleAccept}
          onCancel={handleCancel}
          />
        </Box>
      )}
    </Stack>
    );
};
export default ColorPicker;
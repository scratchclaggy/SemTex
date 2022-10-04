import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { HuePicker } from 'react-color';
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
        <RectangleIcon sx={{backgroundColor:{color}}}/>
      </Button>
      {display && (
        <HuePicker
        color={color}
        onChange={(color) => handleColorChange(color.hex)}
        />
      )}
    </Stack>
    );
};
export default ColorPicker;
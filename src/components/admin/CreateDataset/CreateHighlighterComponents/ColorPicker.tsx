import { Box, Button, Stack } from '@mui/material';
import { useState } from 'react';
import { HuePicker } from 'react-color';

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
    <Stack direction="row">
      <Button  onClick={handleDisplay}>
        Pick Color:
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
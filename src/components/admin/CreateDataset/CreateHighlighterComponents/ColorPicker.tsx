import { useState } from 'react';
import { HuePicker } from 'react-color';

const ColorPicker = () => {
  const [color, setColor] = useState("#ff0000")

  const handleColorChange = (color:string) => {
    setColor(color)
  }

  return (
        <HuePicker
        color={color}
        onChange={(color) => handleColorChange(color.hex)}
        />
    );
};
export default ColorPicker;
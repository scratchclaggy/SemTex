import RectangleIcon from "@mui/icons-material/Rectangle";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { PhotoshopPicker } from "react-color";
import { Controller, useFormContext } from "react-hook-form";

const ColorPicker: React.FC<{ index: number }> = ({ index }) => {
  const { getValues, control, setValue } = useFormContext();
  const [display, setDisplay] = useState(false);
  const [prevColor, setPrevColor] = useState(
    getValues(`highlight_options[${index}].color`)
  );

  const handleDisplay = () => {
    setDisplay(!display);
  };

  return (
    <Controller
      control={control}
      name={`highlight_options[${index}].color`}
      render={({ field: { name, value } }) => {
        return (
          <Stack direction="row" alignItems="center">
            <Typography>Select Color:</Typography>
            <Button onClick={handleDisplay}>
              <RectangleIcon fontSize="large" sx={{ color: value }} />
            </Button>
            {display && (
              <Box
                style={{
                  position: "absolute",
                  marginTop: "380px",
                  zIndex: 1000,
                }}
              >
                <PhotoshopPicker
                  header="Highlighter Colour"
                  color={value}
                  onAccept={() => {
                    setPrevColor(value);
                    handleDisplay();
                  }}
                  onCancel={() => {
                    setValue(name, prevColor);
                    handleDisplay();
                  }}
                  onChange={(color) => setValue(name, color.hex)}
                />
              </Box>
            )}
          </Stack>
        );
      }}
    />
  );
};
export default ColorPicker;

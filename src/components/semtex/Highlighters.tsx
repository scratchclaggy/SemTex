import { Box, Button, ClickAwayListener, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import useDataset from "src/hooks/dataset";

var convert = require('color-convert');

const Highlighters = () => {
  const router = useRouter();
  const datasetID = router.query.datasetID as string | undefined;
  const { dataset, datasetError } = useDataset(datasetID);
  const HighlightOptions = dataset?.highlightOptions;

  const [active, setActive] = useState<string | null>(null);

  const handleClick = (color: string) => {
    setActive(color);
  };

  const handleClickAway = () => {
    setActive(null);
  };

  const isLight = (color: string) =>{
    const hsl = convert.hex.hsl(color)
    if(hsl[2] > 50){
      return true
    }
    return false
  }
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        marginTop={4}
        style={{
          backgroundColor: "#F5F5F0",
          borderRadius: "16px",
          width: "200px",
          height: "75vh",
        }}
      >
        <Stack
          spacing={5}
          justifyContent="space-evenly"
          alignItems="center"
          style={{
            padding: "10px",
          }}
        >
          {HighlightOptions?.map((highlighters) => (
            <Button
              key={highlighters.id}
              onClick={() => handleClick(highlighters.color)}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: highlighters.color,
                padding: "5px",
                minHeight: "8vh",
                color: isLight(highlighters.color) === true ? "black" : "white",
                outline: highlighters.color === active ? "solid" : null,
                outlineWidth: "1px",
                outlineColor: "black",
                outlineOffset: "3px",
                borderStyle: highlighters.color === active ? "solid" : null,
                borderWidth: "1px",
                borderColor: "black",
                "&:hover": {
                  backgroundColor: highlighters.color,
                },
              }}
            >
              {highlighters.label}
            </Button>
          ))}
          <Button
            onClick={() => handleClick("delete")}
            variant="contained"
            fullWidth
            sx={{
              padding: "5px",
              minHeight: "8vh",
              color: "black",
              backgroundColor: "white",
              outline: "delete" === active ? "solid" : null,
              outlineWidth: "1px",
              outlineColor: "black",
              outlineOffset: "3px",
              borderStyle: "delete" === active ? "solid" : null,
              borderWidth: "1px",
              borderColor: "black",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          >
            Delete Highlight
          </Button>
        </Stack>
      </Box>
    </ClickAwayListener>
  );
};

export default Highlighters;

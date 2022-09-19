import { Box, Button, ClickAwayListener, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import useDataset from "src/hooks/dataset";

const Highlighters = () => {
  const router = useRouter();
  const datasetID = router.query.datasetID as string | undefined;
  const { dataset, datasetError } = useDataset(datasetID);
  const HighlightOptions = dataset?.highlightOptions;

  const [active, setActive] = useState("");

  const handleClick = (color: string) => {
    setActive(color);
  };

  const handleClickAway = () => {
    setActive("");
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        marginTop={4}
        style={{
          backgroundColor: "#F5F5F0",
          borderRadius: "16px",
          width: "200px",
          height: "60vh",
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
              sx={{
                backgroundColor: highlighters.color,
                textShadow:
                  "1px 0 0 black, 0 -1px 0 black, 0 1px 0 black, -1px 0 0 black",
                boxShadow: highlighters.color === active ? "0 0 10px #000" : "",
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
            sx={{
              textShadow:
                "1px 0 0 black, 0 -1px 0 black, 0 1px 0 black, -1px 0 0 black",
              boxShadow: "delete" === active ? "0 0 10px #000" : "",
              backgroundColor: "white",
              borderColor: "black",
              borderWidth: "1px",
              borderStyle: "solid",
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

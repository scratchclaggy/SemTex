import { Box, Stack, Button } from "@mui/material";
import { useRouter } from "next/router";
import Highlighter_Selection from "./Highlighter_Selection";
import useDataset from "src/hooks/dataset";
import { useState } from "react";

const Highlighters = () => {
  const router = useRouter();
  const datasetID = router.query.datasetID as string | undefined;
  const { dataset, datasetError } = useDataset(datasetID);
  const HighlightOptions = dataset?.highlightOptions

  const [active, setActive] = useState("")

  const handleClick = (color: string) => {
    setActive(color)
    console.log(color)
  }

  return (
    <Box
    marginTop={4}
    style={{
      backgroundColor: "#F5F5F0",
      borderRadius: "16px",
      width:'200px',
      height:'60vh',
    }}
    >
      <Stack
      spacing={5}
      justifyContent="space-evenly"
      alignItems="center"
      style={{
        padding:"10px"
      }}
      >
        {HighlightOptions?.map((highlighters) =>(
          <Button
          key={highlighters.id}
          onClick={event => handleClick(highlighters.color)}
          variant="contained"
          sx={{
            backgroundColor: highlighters.color,
            textShadow: "1px 0 0 black, 0 -1px 0 black, 0 1px 0 black, -1px 0 0 black",
            boxShadow: highlighters.color === active ? "0 0 10px #000" : "",
          }}
          >{highlighters.label}
          </Button>
        ))}
        <Button
        onClick={event => handleClick("highlighters.color")}
        variant="contained"
        sx={{
          textShadow: "1px 0 0 black, 0 -1px 0 black, 0 1px 0 black, -1px 0 0 black",
          boxShadow: "delete" === active ? "0 0 10px #000" : ""
        }}
        >Delete Highlight</Button>
      </Stack>
    </Box>
  );
};

export default Highlighters;

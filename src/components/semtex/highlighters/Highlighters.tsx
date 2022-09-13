import { Box, Stack } from "@mui/material";
import { Button } from "@mui/material";
import Highlighter_Selection from "./Highlighter_Selection";
const Highlighters = () => {

  const HighlightOptions = [
    {
      id: "674fa6c7-8d7a-4d31-b6bd-ac42dc9864a2",
      label: "Somber",
      color: "navy"
    },
    {
      id: "9a3234ab-7108-4b5d-8778-6e80e174936f",
      label: "Jubilant",
      color: "lavender"
    },
    {
      id: "83756432-36b1-45ae-91ff-59089324ad6a",
      label: "Energetic",
      color: "salmon"
    },
    {
      id: "7ae1e36a-e574-4c03-9852-25dfa52d1830",
      label: "Bright",
      color: "orange"
    },
    {
      id: "7ae1e36a-e574-4c03-9852-25dfa52d1830",
      label: "Happy",
      color: "gold"
    },
    {
      id: "7ae1e36a-e574-4c03-9852-25dfa52d1830",
      label: "Loving",
      color: "fuchsia"
    }
  ]

  return (
    <Box
    style={{
      border:'solid',
      borderWidth:'1px',
      width:'200px',
      height:'600px',
      margin:'4px'
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
        {HighlightOptions.map((highlighters) =>(
          <Button
          fullWidth
          sx={{
            color: "white",
            textShadow: "1px 0 0 black, 0 -1px 0 black, 0 1px 0 black, -1px 0 0 black",
            background: highlighters.color,
            "&:active":{
              background: "purple"
            }
            
          }}
          >{highlighters.label}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default Highlighters;

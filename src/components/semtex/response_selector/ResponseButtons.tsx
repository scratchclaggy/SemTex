import { Button, Grid, RadioGroup } from "@mui/material";
import { ResponseSelectorProps } from "./ResponseSelector";

const ResponseButtons = ({
  responses,
  currentResponse,
  setCurrentResponse,
}: ResponseSelectorProps) => {
  return (
    <RadioGroup>
      <Grid container spacing={2}>
        {responses.map((response) => {
          return (
            <Grid item id={response}>
              <Button
                variant="contained"
                onClick={() => {
                  setCurrentResponse(response);
                }}
              >
                {response}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </RadioGroup>
  );
};

export default ResponseButtons;

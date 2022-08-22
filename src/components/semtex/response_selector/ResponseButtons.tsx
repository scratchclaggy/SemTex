import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import { dataset } from "../Semtex";

const ResponseButtons = () => {
  // TODO: Retrieve the dataset via SWR
  const responseOptions = dataset.responses;
  // TODO: Update server state for this user response
  const [selection, setSelection] = useState<string | null>(null);

  return (
    <FormControl>
      <FormLabel id="response-radio-label">Response</FormLabel>
      <RadioGroup
        aria-labelledby="response-radio-label"
        name="response-radio"
        value={selection}
        onChange={(event) => setSelection(event.target.value)}
        row
      >
        {responseOptions.map((responseOption) => (
          <FormControlLabel
            key={responseOption}
            value={responseOption}
            control={<Radio />}
            label={responseOption}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default ResponseButtons;

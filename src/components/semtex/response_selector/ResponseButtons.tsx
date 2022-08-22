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
  const responses = dataset.responses;
  // TODO: Update server state for this user response
  const [response, setResponse] = useState<string | null>(null);

  return (
    <FormControl>
      <FormLabel id="response-radio-label">Response</FormLabel>
      <RadioGroup
        aria-labelledby="response-radio-label"
        name="response-radio"
        value={response}
        onChange={(event) => setResponse(event.target.value)}
        row
      >
        {responses.map((response) => (
          <FormControlLabel
            key={response}
            value={response}
            control={<Radio />}
            label={response}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default ResponseButtons;

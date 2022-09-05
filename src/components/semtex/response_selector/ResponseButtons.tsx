import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import useAuth from "src/contexts/AuthContext";
import useDataset from "src/hooks/dataset";

const ResponseButtons = () => {
  const { user } = useAuth();
  const { dataset } = useDataset(user?.user_metadata.dataset);
  const [selection, setSelection] = useState<string | null>(null);

  if (!dataset) {
    return null;
  }

  const responseOptions = dataset.responseOptions;
  // TODO: Update server state for this user response

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
            key={responseOption.id}
            value={responseOption.label}
            control={<Radio />}
            label={responseOption.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default ResponseButtons;

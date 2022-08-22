import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { dataset } from "../Semtex";

const ResponseDropdown = () => {
  // TODO: Retrieve the dataset via SWR
  const responseOptions = dataset.responses;
  // TODO: Update server state for this user response
  const [selection, setSelection] = useState<string | null>(null);

  return (
    <FormControl fullWidth>
      <InputLabel id="response-dropdown-label">Response</InputLabel>
      <Select
        labelId="response-dropdown-label"
        id="response-dropdown"
        value={selection ?? ""}
        label="Response"
        onChange={(event) => {
          setSelection(event.target.value);
        }}
      >
        {responseOptions.map((responseOption) => {
          return (
            <MenuItem key={responseOption} value={responseOption}>
              {responseOption}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default ResponseDropdown;

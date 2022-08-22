import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { dataset } from "../Semtex";

const ResponseDropdown = () => {
  // TODO: Retrieve the dataset via SWR
  const responses = dataset.responses;
  // TODO: Update server state for this user response
  const [currentResponse, setCurrentResponse] = useState<string | null>(null);

  return (
    <FormControl fullWidth>
      <InputLabel id="response-dropdown-label">Response</InputLabel>
      <Select
        labelId="response-dropdown-label"
        id="response-dropdown"
        value={currentResponse ?? ""}
        label="Response"
        onChange={(event) => {
          setCurrentResponse(event.target.value);
        }}
      >
        {responses.map((response) => {
          return (
            <MenuItem key={response} value={response}>
              {response}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default ResponseDropdown;

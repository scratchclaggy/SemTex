import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import useAuth from "src/contexts/AuthContext";
import { useDataset } from "src/hooks/db";

const ResponseDropdown = () => {
  const { user } = useAuth();
  const { dataset } = useDataset(user?.user_metadata.dataset);
  const [selection, setSelection] = useState<string | null>(null);

  if (!dataset) {
    return null;
  }

  const responseOptions = dataset.responseOptions;
  // TODO: Update server state for this user response

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
            <MenuItem key={responseOption.id} value={responseOption.label}>
              {responseOption.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default ResponseDropdown;

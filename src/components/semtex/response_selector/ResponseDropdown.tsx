import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import useDataset from "src/hooks/dataset";

const ResponseDropdown = () => {
  const router = useRouter();
  const { dataset, datasetError } = useDataset(
    router.query.datasetID as string | undefined
  );
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

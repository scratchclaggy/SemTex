import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ResponseSelectorProps } from "./ResponseSelector";

const ResponseDropdown = ({
  responses,
  currentResponse,
  setCurrentResponse,
}: ResponseSelectorProps) => {
  return (
    <Box margin={2} minWidth={420}>
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
    </Box>
  );
};

export default ResponseDropdown;

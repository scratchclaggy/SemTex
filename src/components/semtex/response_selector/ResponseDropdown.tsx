import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import useDataset from "src/hooks/dataset";
import useUserResponses from "src/hooks/user_responses";
import { responseOptionDbAccess } from "src/utils/user_response";
import { textSampleIdAtom } from "../Semtex";

const ResponseDropdown = () => {
  const router = useRouter();
  const datasetID = router.query.datasetID as string | undefined;
  const { dataset } = useDataset(datasetID);
  const { userResponses, mutate } = useUserResponses(datasetID);

  const textSampleID = useAtomValue(textSampleIdAtom);
  const { responseOption, updateResponseOption } = useMemo(
    () => responseOptionDbAccess(userResponses, textSampleID, mutate),
    [userResponses, textSampleID, mutate]
  );
  const [selection, setSelection] = useState<string>(responseOption?.id ?? "");

  const responseOptions = dataset?.responseOptions ?? [];

  return (
    <FormControl fullWidth>
      <InputLabel id="response-dropdown-label">Response</InputLabel>
      <Select
        labelId="response-dropdown-label"
        id="response-dropdown"
        value={selection}
        label="Response"
        onChange={(event) => {
          setSelection(event.target.value);
          updateResponseOption(event.target.value);
        }}
      >
        {responseOptions.map((responseOption) => {
          return (
            <MenuItem key={responseOption.id} value={responseOption.id}>
              {responseOption.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default ResponseDropdown;

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import useDataset from "src/hooks/dataset";
import { useUserResponse } from "src/hooks/user_response";
import { responseOptionDbAccess } from "src/utils";
import { textSampleIdAtom } from "../Semtex";

const ResponseButtons = () => {
  const router = useRouter();
  const datasetID = router.query.datasetID as string | undefined;
  const { dataset } = useDataset(datasetID);
  const { userResponses, mutate } = useUserResponse(datasetID);

  const textSampleID = useAtomValue(textSampleIdAtom);
  const { responseOption, updateResponseOption } = useMemo(
    () => responseOptionDbAccess(userResponses, textSampleID, mutate),
    [userResponses, textSampleID]
  );
  const [selection, setSelection] = useState<string>(responseOption?.id ?? "");

  if (dataset === undefined || dataset === null) {
    return null;
  }

  const responseOptions = dataset.responseOptions;
  return (
    <FormControl>
      <FormLabel id="response-radio-label">Response</FormLabel>
      <RadioGroup
        aria-labelledby="response-radio-label"
        name="response-radio"
        value={selection}
        onChange={(event) => {
          setSelection(event.target.value);
          updateResponseOption(event.target.value);
        }}
        row
      >
        {responseOptions.map((responseOption) => (
          <FormControlLabel
            key={responseOption.id}
            value={responseOption.id}
            control={<Radio />}
            label={responseOption.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default ResponseButtons;

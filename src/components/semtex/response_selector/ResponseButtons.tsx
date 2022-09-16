import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import useDataset from "src/hooks/dataset";
import useUserResponses from "src/hooks/user_responses";
import { responseOptionDbAccess } from "src/utils/user_response";
import { textSampleIdAtom } from "../Semtex";

const ResponseButtons = () => {
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
  useEffect(
    () => setSelection(responseOption?.id ?? ""),
    [textSampleID, responseOption?.id]
  );

  const responseOptions = dataset?.responseOptions ?? [];

  return (
    <FormControl>
      <FormLabel id="response-radio-label" style={{ marginLeft: "8vw" }}>
        Select Most Accurate Response
      </FormLabel>
      <RadioGroup
        aria-labelledby="response-radio-label"
        name="response-radio"
        value={selection}
        style={{
          marginLeft: "5vw",
        }}
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

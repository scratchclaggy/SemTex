import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import useDataset from "src/hooks/dataset";
import useUserResponse from "src/hooks/user_response";
import { userResponseIdAtom } from "../Semtex";

const ResponseButtons = () => {
  const router = useRouter();
  const datasetID = router.query.datasetID as string | undefined;
  const { dataset } = useDataset(datasetID);

  const userResponseID = useAtomValue(userResponseIdAtom);
  const { userResponse, updateResponseOption } =
    useUserResponse(userResponseID);

  const responseOptions = dataset?.responseOptions ?? [];

  return (
    <FormControl>
      <FormLabel id="response-radio-label" style={{ marginLeft: "8vw" }}>
        Select Most Accurate Response
      </FormLabel>
      <RadioGroup
        aria-labelledby="response-radio-label"
        name="response-radio"
        value={userResponse?.response?.id ?? ""}
        style={{
          marginLeft: "5vw",
        }}
        onChange={(event) => {
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

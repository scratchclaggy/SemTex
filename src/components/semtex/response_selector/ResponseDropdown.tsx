import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import useAuth from "src/contexts/AuthContext";
import useDataset from "src/hooks/dataset";
import useUserResponse from "src/hooks/user_response";
import { userResponseIdAtom } from "../Semtex";

const ResponseDropdown = () => {
  const router = useRouter();
  const datasetID = router.query.datasetID as string | undefined;
  const { dataset } = useDataset(datasetID);

  const userResponseID = useAtomValue(userResponseIdAtom);
  const { user } = useAuth();
  const { userResponse, updateResponseOption } = useUserResponse(
    user,
    userResponseID
  );

  const responseOptions = dataset?.responseOptions ?? [];

  return (
    <FormControl fullWidth>
      <InputLabel id="response-dropdown-label">Response</InputLabel>
      <Select
        labelId="response-dropdown-label"
        id="response-dropdown"
        value={userResponse?.response?.id ?? ""}
        label="Response"
        onChange={(event) => {
          updateResponseOption(userResponse, event.target.value);
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

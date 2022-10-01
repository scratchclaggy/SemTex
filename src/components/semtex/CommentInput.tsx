import { TextField } from "@mui/material";
import { useAtomValue } from "jotai";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import useUserResponse from "src/hooks/user_response";
import { userResponseIdAtom } from "./Semtex";

const CommentInput = () => {
  const userResponseID = useAtomValue(userResponseIdAtom);
  const { userResponse, updateComment } = useUserResponse(userResponseID);
  const comment = userResponse?.comments;

  const [textFieldVal, setTextFieldVal] = useState("");
  useEffect(() => {
    setTextFieldVal(comment ?? "");
  }, [userResponseID]);

  const debounceInput = useMemo(() => {
    return debounce(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateComment(event.target.value);
      },
      500,
      { leading: false, trailing: true }
    );
  }, [userResponse]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextFieldVal(event.target.value);
    debounceInput(event);
  };

  return (
    <TextField
      onChange={handleChange}
      value={textFieldVal}
      multiline
      fullWidth
      placeholder="additional comments"
      variant="standard"
      size="medium"
      minRows={4}
      maxRows={4}
      InputProps={{
        disableUnderline: true,
      }}
      style={{
        backgroundColor: "#F5F5F0",
        borderRadius: "16px",
        height: "15vh",
        padding: "10px",
      }}
    />
  );
};

export default CommentInput;

import { TextField } from "@mui/material";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import useUserResponse from "src/hooks/user_response";
import { useDebounce } from "usehooks-ts";
import { userResponseIdAtom } from "./Semtex";

const CommentInput = () => {
  const userResponseID = useAtomValue(userResponseIdAtom);
  const { userResponse, updateComment } = useUserResponse(userResponseID);

  const [comment, setComment] = useState("");

  useEffect(() => {
    setComment(userResponse?.comments ?? "");
  }, [userResponseID]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const debouncedComment = useDebounce(comment, 500);

  useEffect(() => {
    updateComment(userResponse, debouncedComment);
  }, [debouncedComment]);

  return (
    <TextField
      onChange={handleChange}
      value={comment}
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

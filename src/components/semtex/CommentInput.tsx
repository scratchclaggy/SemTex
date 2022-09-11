import { TextField } from "@mui/material";
import { useAtomValue } from "jotai";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useUserResponse } from "src/hooks/user_response";
import { commentDbAccess } from "src/utils";
import { textSampleIdAtom } from "./Semtex";

const CommentInput = () => {
  const router = useRouter();
  const { userResponses, mutate } = useUserResponse(
    router.query.datasetID as string | undefined
  );

  const textSampleID = useAtomValue(textSampleIdAtom);
  const { comment, updateComment } = useMemo(
    () => commentDbAccess(userResponses, textSampleID, mutate),
    [userResponses, textSampleID]
  );
  const [textFieldVal, setTextFieldVal] = useState(comment);

  const debounceInput = useMemo(() => {
    return debounce(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateComment(event.target.value);
      },
      500,
      { leading: false, trailing: true }
    );
  }, []);

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
    />
  );
};

export default CommentInput;

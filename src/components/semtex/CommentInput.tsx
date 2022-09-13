import { TextField } from "@mui/material";
import { useAtomValue } from "jotai";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import useUserResponses from "src/hooks/user_responses";
import { commentDbAccess } from "src/utils/user_response";
import { textSampleIdAtom } from "./Semtex";

const CommentInput = () => {
  const router = useRouter();
  const { userResponses, mutate } = useUserResponses(
    router.query.datasetID as string | undefined
  );

  const textSampleID = useAtomValue(textSampleIdAtom);
  const { comment, updateComment } = useMemo(
    () => commentDbAccess(userResponses, textSampleID, mutate),
    [userResponses, textSampleID, mutate]
  );
  const [textFieldVal, setTextFieldVal] = useState(comment);

  useEffect(() => setTextFieldVal(comment), [comment]);

  const debounceInput = useMemo(() => {
    return debounce(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateComment(event.target.value);
      },
      500,
      { leading: false, trailing: true }
    );
  }, [updateComment]);

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
      sx={{
        backgroundColor:"white"
      }}
    />
  );
};

export default CommentInput;

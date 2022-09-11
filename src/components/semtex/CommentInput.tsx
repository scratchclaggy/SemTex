import { Box } from "@mui/material";
import { useAtomValue } from "jotai";
import { throttle } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useUrComment } from "src/hooks/user_response";
import { textSampleIdAtom } from "./Semtex";

const CommentInput = () => {
  const router = useRouter();
  const textSampleID = useAtomValue(textSampleIdAtom);

  const { comment, updateComment } = useUrComment(
    router.query.datasetID as string | undefined,
    textSampleID
  );
  const [inputComment, setInputComment] = useState(comment);
  useEffect(() => {
    setInputComment(comment ?? "");
  }, [comment]);

  const debounceInput = useMemo(() => {
    return throttle(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateComment(event.target.value);
      },
      1000,
      { leading: false, trailing: true }
    );
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputComment(event.target.value);
    debounceInput(event);
  };

  return (
    <Box>
      <form>
        <textarea
          onChange={handleChange}
          value={inputComment}
          style={{
            width: "800px",
            height: "200px",
            fontSize: "15px",
            resize: "none",
          }}
        ></textarea>
      </form>
    </Box>
  );
};

export default CommentInput;

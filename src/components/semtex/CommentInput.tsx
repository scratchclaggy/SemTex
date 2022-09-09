import { Box } from "@mui/material";
import { useAtomValue } from "jotai";
import debounce from "lodash/debounce";
import { useRouter } from "next/router";
import React, { useState } from "react";
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

  const handleInput = debounce((event) => {
    updateComment(event.target.value);
  }, 300);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputComment(event.target.value);
    handleInput(event);
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

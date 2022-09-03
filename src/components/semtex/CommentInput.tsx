import { Box } from "@mui/material";
import React, {useState, useCallback} from "react";
import debounce from 'lodash/debounce';

const CommentInput = () => {

  const [text, setText] = useState('')
  const [dbValue, setdbValue] = useState('')

  const handleChange = (event: React.FormEvent) => {
    const debouncedSave = debounce(() => event.currentTarget, 1100)
    debouncedSave();
  
  };
  return (
    <Box>
      <form onChange={handleChange}>
        <textarea
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

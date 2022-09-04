import { Box } from "@mui/material";
import debounce from "lodash/debounce";
import React, { useState } from "react";

const CommentInput = () => {
  const [text, setText] = useState("");
  // setText(event.target.value) <- console.log below will be replaced with this function
  const handleInput = debounce((event) => {
    console.log(event.target.value);
  }, 300);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInput(event);
  };

  return (
    <Box>
      <form>
        <textarea
          onChange={handleChange}
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

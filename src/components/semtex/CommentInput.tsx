import { Box } from "@mui/material";
import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import debounce from 'lodash/debounce';

const CommentInput = () => {

  const [text, setText] = useState('')
  
  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    debounce(() =>{
      console.log("text")
    }, 1000)
  
  };
  return (
    <Box>
      <form 
      onChange={handleChange}>
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

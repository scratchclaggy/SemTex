import { Box } from "@mui/material";

const CommentInput = () => {
  const handleChange = () => {
    console.log("Key Stroke");
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

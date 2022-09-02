import { Box } from "@mui/material";

const CommentInput = () => {

  function handleChange ()
  {
    console.log("Key Stroke")
  }

  return (
    <Box>
      <form>
      <textarea
      onChange={handleChange}
      style={{
        width:"800px",
        height:"200px",
        fontSize:"15px",
        resize:"none"
      }}
      >
      </textarea>
    </form>
    </Box>
  )
};

export default CommentInput;

import { Stack } from "@mui/material";
import CreateHighlighter from "./CreateHighlighterComponents/CreateHighlighter";
import CreateResponses from "./CreateResponses";

const CreateDataset = () => {
  const handleUpload = () => {
    console.log("Upload");
  };

  return (
    <form
      style={{
        width: "50%",
        marginLeft: "25%",
        textAlign: "center",
      }}
    >
      <Stack paddingTop={10} spacing={3}>
        <input type="text" placeholder="Dataset Name" />
        <input type="text" placeholder="Dataset Instructions" />
        <input type="button" value="Upload" onClick={handleUpload} />
        <CreateResponses />
        <CreateHighlighter />
      </Stack>
    </form>
  );
};
export default CreateDataset;

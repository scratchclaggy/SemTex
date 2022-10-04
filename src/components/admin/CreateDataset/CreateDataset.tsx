import CreateHighlighter from "./CreateHighlighterComponents/CreateHighlighter";
import CreateResponses from "./CreateResponses";

const CreateDataset = () => {
  const handleUpload = () => {
    console.log("Upload");
  };

  return (
    <form 
    style={{ 
      position: "absolute",
      justifyContent: "center",
      alignItems: "center"
    }}
    >
      <input type="text" placeholder="Dataset Name" />
      <input type="text" placeholder="Dataset Instructions" />
      <input type="button" value="Upload" onClick={handleUpload} />
      <CreateResponses />
      <CreateHighlighter />
    </form>
  );
};
export default CreateDataset;

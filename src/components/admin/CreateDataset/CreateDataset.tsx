import CreateHighlighter from "./CreateHighlighter";
import CreateResponses from "./CreateResponses";
import CSVReader from "./UploadButton";

const CreateDataset = () => {
  return (
    <form style={{ position: "absolute" }}>
      <input type="text" placeholder="Dataset Name" />
      <input type="text" placeholder="Dataset Instructions" />
      <CSVReader />
      <CreateResponses />
      <CreateHighlighter />
    </form>
  );
};
export default CreateDataset;

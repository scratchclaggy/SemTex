import CreateHighlighter from "./CreateHighlighter";
import CreateResponses from "./CreateResponses";

const CreateDataset = () => {

  const handleUpload = () =>{
    console.log("Upload")
  }

  return (
    <form style={{position: "absolute"}}>
      <input type="text" placeholder="Dataset Name" />
      <input type="text" placeholder="Dataset Instructions"/>
      <input type="button" value="Upload" onClick={handleUpload}/>
      <CreateResponses/>
      <CreateHighlighter/>
    </form>
  );
};
export default CreateDataset;
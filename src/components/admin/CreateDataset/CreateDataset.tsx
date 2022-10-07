import { Box, Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import CreateHighlighter from "./CreateHighlighterComponents/CreateHighlighter";
import CreateResponses from "./CreateResponses";

const CreateDataset = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form
        style={{
          width: "50%",
          marginLeft: "25%",
          textAlign: "center",
        }}
      >
        <Stack paddingTop={10} spacing={1} alignItems="center">
          <Box>
            <label>Dataset Name: </label>
            <input type="text" />
          </Box>
          <label>Dataset Instructions</label>
          <textarea
          style={{
            width: "400px",
            height: "150px",
            resize: "none"
          }}
          />
          <label>Upload Dataset CSV</label>
          <Box >
            <input type="file" id="myFile" name="filename"/>
          </Box>
          <CreateResponses />
          <CreateHighlighter />
        </Stack>
      </form>
    </FormProvider>
  );
};
export default CreateDataset;

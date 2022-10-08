import { Box, Stack, TextField } from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import CreateHighlighter from "./CreateHighlighterComponents/CreateHighlighter";
import CreateResponses from "./CreateResponses";

const CreateDataset = () => {
  const methods = useForm({
    defaultValues: {
      datasetTitle: "",
      instructions: "",
      textsamples: [],
      responses: [],
      highlights: []
    }
  });
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(console.log)}
        style={{
          width: "50%",
          marginLeft: "25%",
          textAlign: "center",
        }}
      >
        <Stack paddingTop={10} spacing={1} alignItems="center">
          <Box>
            <label>Dataset Name: </label>
            <input {...methods.register("datasetTitle")} type="text" />
          </Box>
          '
          <label>Dataset Instructions</label>
          <Controller
            control={methods.control}
            name="instructions"
            render={({field}) => (
              <textarea 
              {...field} 
              style={{
                width: "400px",
                height: "150px",
                resize: "none"
              }}
              />
            )}
          />

          <label>Upload Dataset CSV</label>
          <Box >
            <input type="file" id="myFile" name="filename"/>
          </Box>

          <CreateResponses />
          
          <Controller 
            control={methods.control}
            name="highlights"
            render={({field: {value, onChange}}) => (
              <CreateHighlighter />
            )}
          />
        
        </Stack>
        <input type="submit" value="Submit" />
      </form>
    </FormProvider>
  );
};
export default CreateDataset;

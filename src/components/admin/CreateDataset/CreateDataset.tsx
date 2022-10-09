import { Box, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import CreateHighlighter from "./CreateHighlighterComponents/CreateHighlighter";
import CreateResponses from "./CreateResponses";
import RandomWords from "random-words";

const CreateDataset = () => {
  const methods = useForm({
    defaultValues: {
      name: "",
      passkey: "",
      instructions: "",
      text_samples: [],
      highlight_options: [],
      response_options: []
    }
  });
  
  const [passkey, setPasskey] = useState("");

  const handlePasskey = () => {
    const keyArray = RandomWords({exactly: 3});
    let pass = ""
    keyArray.forEach((e, index) =>{
      pass += e;
      if(index != 2){
        pass += "-"
      }
    })
    setPasskey(pass)
  }

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
            <input {...methods.register("name")} type="text" />
          </Box>

          <Box>
            <label>Passkey: </label>
            <p {...methods.register("passkey")} >{passkey}</p>
            <button onClick={handlePasskey}>Generate Passkey</button>
          </Box>
          
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
            name="highlight_options"
            render={() => (
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

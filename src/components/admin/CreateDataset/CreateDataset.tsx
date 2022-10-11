import { Box, Stack, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import CreateHighlighter from "./CreateHighlighterComponents/CreateHighlighter";
import CreateResponses from "./CreateResponses";
import RandomWords from "random-words";
import { Dataset } from "src/types/db";

const CreateDataset = () => {
  const methods = useForm<Dataset>({
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

  // -------------------- Function Which Generates Passkey -----------------
  const handlePasskey = () => {
    const keyArray = RandomWords({exactly: 2});
    let pass = ""
    keyArray.forEach((e, index) =>{
      pass += e;
      if(index != 2){
        pass += " "
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
            <input {...methods.register("passkey")} type="text" value={passkey}/>
          </Box>

          <label>Passkey: </label>
          <p>{passkey}</p>
          <button type="button" onClick={handlePasskey}>Generate Passkey</button>
          
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

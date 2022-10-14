import { Box, IconButton, Stack, Typography } from "@mui/material";
import RandomWords from "random-words";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Dataset, Submission } from "src/types/db";
import CreateHighlighter from "./CreateHighlighterComponents/CreateHighlighter";
import CreateResponses from "./CreateResponses";
import CSVReader from "./CSVReader";
import { insertDataset } from "src/utils/dataset";
import RefreshIcon from '@mui/icons-material/Refresh';

const CreateDataset = () => {
  const generatePasskey = () => {
    return RandomWords({ exactly: 2 }).join(" ");
  };

  const methods = useForm<Dataset>({
    defaultValues: {
      name: "",
      instructions: "",
      passkey: generatePasskey(),
      text_samples: [],
      response_options: [],
      highlight_options: [],
    },
  });

  const cleanSubmit = (data: Dataset) => {
    const submitData: Submission = {
      name: data.name,
      instructions: data.instructions,
      passkey: data.passkey,
      text_samples: data.text_samples.filter((sample) => sample.body != undefined),
      response_options: data.response_options,
      highlight_options: data.highlight_options
    }
    insertDataset(submitData)
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(
          data => cleanSubmit(data)
        )}
        style={{
          width: "50%",
          marginLeft: "25%",
          textAlign: "center",
        }}
      >
        <Stack paddingTop={10} spacing={1} alignItems="center">
          <Typography
          fontFamily={"Roboto Mono"}
          fontSize={"36px"}
          >Administrator Home
          </Typography>
          
          <Box>
            <label>Dataset Name: </label>
            <input {...methods.register("name")} type="text" />
          </Box>

          <Controller
            name="passkey"
            control={methods.control}
            render={({ field: { name, value } }) => (
              <Stack direction="row" alignItems="center" justifyContent="flex-start">
                <IconButton
                  type="button"
                  onClick={() => methods.setValue(name, generatePasskey())}
                >
                  <RefreshIcon />
                </IconButton>
                <Typography fontFamily="roboto mono">Passkey: </Typography>
                <p>{`"${value}"`}</p>
              </Stack>
            )}
          />

          <label>Dataset Instructions</label>
          <Controller
            control={methods.control}
            name="instructions"
            render={({ field }) => (
              <textarea
                {...field}
                style={{
                  width: "400px",
                  height: "150px",
                  resize: "none",
                }}
              />
            )}
          />
          <CSVReader />
          <Stack direction="row">
            <CreateResponses />
            <CreateHighlighter />
          </Stack>
        </Stack>
        <input type="submit" value="Submit" />
      </form>
    </FormProvider>
  );
};
export default CreateDataset;

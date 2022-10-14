import { Alert, AlertTitle, Box, Stack, Typography } from "@mui/material";
import RandomWords from "random-words";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Dataset, Submission } from "src/types/db";
import CreateHighlighter from "./CreateHighlighterComponents/CreateHighlighter";
import CreateResponses from "./CreateResponses";
import CSVReader from "./CSVReader";
import { insertDataset } from "src/utils/dataset";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/router";

const CreateDataset = () => {
  const router = useRouter()


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
          data => {cleanSubmit(data)
          router.push('/admin')}
        )}
        style={{
          width: "50%",
          marginLeft: "25%",
          textAlign: "center",
        }}
      >

        <Stack paddingTop={10} spacing={1} alignItems="center">
          <ErrorMessage errors={methods.formState.errors} name="text_samples" render={() =>
            <Alert severity="error">
              <AlertTitle>Text Samples</AlertTitle>
              <Typography>No text samples uploaded</Typography>
            </Alert>} />
          <ErrorMessage errors={methods.formState.errors} name="response_options" render={() =>
            <Alert severity="error">
              <AlertTitle>Response Options</AlertTitle>
              <Typography>Minimum of one response option required</Typography>
            </Alert>} />
          <ErrorMessage errors={methods.formState.errors} name="highlight_options" render={() =>
            <Alert severity="error">
              <AlertTitle>Highlight Options</AlertTitle>
              <Typography>Minimum one highlight option required</Typography>
            </Alert>} />
          <Box>
            <label>Dataset Name: </label>
            <input {...methods.register("name", { required: true })} required type="text" />
          </Box>

          <Controller
            name="passkey"
            control={methods.control}
            render={({ field: { name, value } }) => (
              <Box>
                <label>Passkey: </label>
                <p>{`"${value}"`}</p>
                <button
                  type="button"
                  onClick={() => methods.setValue(name, generatePasskey())}
                >
                  Generate Passkey
                </button>
              </Box>
            )}
          />

          <label>Dataset Instructions</label>
          <Controller
            control={methods.control}
            name="instructions"
            rules={{ required: true }}
            render={({ field }) => (
              <textarea
                required
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
          <CreateResponses />
          <CreateHighlighter />
        </Stack>
        <input type="submit" value="Submit" />
      </form>
    </FormProvider>
  );
};
export default CreateDataset;

import { Box, Stack } from "@mui/material";
import RandomWords from "random-words";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Dataset } from "src/types/db";
import CreateHighlighter from "./CreateHighlighterComponents/CreateHighlighter";
import CreateResponses from "./CreateResponses";
// import CSVReader from "./UploadButton";
import CSVReader from "./CSVReader";

const CreateDataset = () => {
  const generatePasskey = () => {
    return RandomWords({ exactly: 2 }).join(" ");
  };

  const methods = useForm<Dataset>({
    defaultValues: {
      name: "",
      passkey: generatePasskey(),
      instructions: "",
      /* text_samples: [], */
      highlight_options: [],
      response_options: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(
          (data) => console.log("VALID", data),
          (data) => console.log("INVALID", data)
        )}
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
          <CreateResponses />

          <CreateHighlighter />
        </Stack>
        <input type="submit" value="Submit" />
      </form>
    </FormProvider>
  );
};
export default CreateDataset;

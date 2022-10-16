import { ErrorMessage } from "@hookform/error-message";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import RandomWords from "random-words";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Dataset, Submission } from "src/types/db";
import { insertDataset } from "src/utils/dataset";
import { useSWRConfig } from "swr";
import CreateHighlighter from "./CreateHighlighterComponents/CreateHighlighter";
import CreateResponses from "./CreateResponses";
import CSVReader from "./CSVReader";

const CreateDataset = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

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
      text_samples: data.text_samples.filter(
        (sample) => sample.body != undefined
      ),
      response_options: data.response_options,
      highlight_options: data.highlight_options,
    };
    insertDataset(submitData);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          cleanSubmit(data);
          mutate("datasetList");
          router.push("/admin");
        })}
      >
        <Grid
          alignItems="center"
          justifyContent="flex-start"
          width="100vw"
          paddingRight="20vw"
        >
          <Grid
            container
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{
              paddingTop: "10px",
            }}
          >
            <Grid container xs={12} justifyContent="center">
              <Typography fontSize="36px" fontFamily="Roboto Mono">
                Create New Dataset
              </Typography>
            </Grid>

            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <label>Dataset Name: </label>
                <input
                  {...methods.register("name", { required: true })}
                  required
                  type="text"
                />
              </Grid>

              <Grid item justifyContent="center">
                <Controller
                  name="passkey"
                  control={methods.control}
                  render={({ field: { name, value } }) => (
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          methods.setValue(name, generatePasskey())
                        }
                      >
                        Generate Passkey
                      </Button>
                      <Box
                        style={{
                          border: " solid 1px grey",
                          padding: "10px",
                          backgroundColor: "white",
                        }}
                      >
                        <Typography
                          fontSize="20px"
                          fontFamily="roboto mono"
                        >{`"${value}"`}</Typography>
                      </Box>
                    </Stack>
                  )}
                />
              </Grid>
            </Grid>

            <Grid
              item
              container
              xs={12}
              spacing={2}
              paddingTop="10px"
              minHeight="40vh"
            >
              <Grid item xs={5}>
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
                        width: "100%",
                        height: "80%",
                        resize: "none",
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={2}>
                <CreateResponses />
              </Grid>

              <Grid item xs={4}>
                <CreateHighlighter />
              </Grid>
            </Grid>

            <Grid item container justifyContent="flex-start" xs={5}>
              <CSVReader />
            </Grid>

            <Grid item container>
              <Button
                type="submit"
                value="Submit"
                variant="contained"
                color="primary"
                style={{
                  width: "41%",
                }}
              >
                Submit
              </Button>
            </Grid>

            <Grid item container spacing={2}>
              <Grid item>
                <ErrorMessage
                  errors={methods.formState.errors}
                  name="text_samples"
                  render={() => (
                    <Alert severity="error">
                      <AlertTitle>Text Samples</AlertTitle>
                      <Typography>No text samples uploaded</Typography>
                    </Alert>
                  )}
                />
              </Grid>
              <Grid item>
                <ErrorMessage
                  errors={methods.formState.errors}
                  name="response_options"
                  render={() => (
                    <Alert severity="error">
                      <AlertTitle>Response Options</AlertTitle>
                      <Typography>
                        Minimum of one response option required
                      </Typography>
                    </Alert>
                  )}
                />
              </Grid>
              <Grid item>
                <ErrorMessage
                  errors={methods.formState.errors}
                  name="highlight_options"
                  render={() => (
                    <Alert severity="error">
                      <AlertTitle>Highlight Options</AlertTitle>
                      <Typography>
                        Minimum one highlight option required
                      </Typography>
                    </Alert>
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};
export default CreateDataset;

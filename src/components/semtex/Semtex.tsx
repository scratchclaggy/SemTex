import { Alert, AlertTitle, Grid, Stack, Typography } from "@mui/material";
import useAuth from "src/contexts/AuthContext";
import { useDataset, useUserResponse } from "src/hooks/db";
import CommentInput from "./CommentInput";
import Highlighters from "./Highlighters";
import History from "./History";
import InstructionModal from "./instruction_modal/InstructionModal";
import InstructionModalButton from "./instruction_modal/InstructionModalButton";
import NavigationButtons from "./NavigationButtons";
import Progress from "./Progress";
import ResponseSelector from "./response_selector/ResponseSelector";
import TextSample from "./TextSample";

const Semtex = () => {
  const { user } = useAuth();
  const { dataset, datasetError } = useDataset(user?.user_metadata.dataset);
  const {
    userResponses,
    userResponsesError,
    updateComment,
    insertHighlight,
    updateHighlight,
    deleteHighlight,
  } = useUserResponse(user?.user_metadata.dataset);

  return (
    <>
      {datasetError && (
        <Alert severity="error">
          <AlertTitle>Error {datasetError.code}</AlertTitle>
          <Typography>{datasetError.message}</Typography>
          {datasetError.details && (
            <Typography>Details: {datasetError.details}</Typography>
          )}
          {datasetError.hint && (
            <Typography>hint: {datasetError.hint}</Typography>
          )}
        </Alert>
      )}
      {userResponsesError && (
        <Alert severity="error">
          <AlertTitle>Error {userResponsesError.code}</AlertTitle>
          <Typography>{userResponsesError.message}</Typography>
          {userResponsesError.details && (
            <Typography>Details: {userResponsesError.details}</Typography>
          )}
          {userResponsesError.hint && (
            <Typography>hint: {userResponsesError.hint}</Typography>
          )}
        </Alert>
      )}
      {userResponses && <pre>{JSON.stringify(userResponses, null, 4)}</pre>}
      {/* dataset && <pre>{JSON.stringify(dataset, null, 4)}</pre> */}
      <button
        onClick={() => {
          const randInt = Math.random() * 100;
          console.log(randInt);

          updateComment(
            "8df338c3-6396-49d1-adf1-4c5c027293b9",
            randInt.toString()
          );
        }}
      >
        change comment
      </button>
      <button
        onClick={() => {
          const randInt = Math.random() * 100;
          console.log(randInt);

          insertHighlight(
            "8df338c3-6396-49d1-adf1-4c5c027293b9",
            randInt.toString(),
            dataset!.highlightOptions[0]
          );
        }}
      >
        new highlight
      </button>
      <button
        onClick={() => {
          const randInt = Math.random() * 100;
          console.log(randInt);

          updateHighlight(
            "8df338c3-6396-49d1-adf1-4c5c027293b9",
            "5dce3c78-7890-4473-995c-3dd7171a683e",
            randInt.toString(),
            dataset!.highlightOptions[0]
          );
        }}
      >
        update highlight
      </button>
      <button
        onClick={() => {
          deleteHighlight(
            "8df338c3-6396-49d1-adf1-4c5c027293b9",
            "5dce3c78-7890-4473-995c-3dd7171a683e"
          );
        }}
      >
        delete highlight
      </button>
      {dataset && (
        <>
          <InstructionModal />
          <Grid container>
            <Grid item>
              <History />
            </Grid>
            <Grid item>
              <Stack>
                <Progress />
                <TextSample />
                <ResponseSelector />
                <CommentInput />
                <NavigationButtons />
              </Stack>
            </Grid>
            <Grid item>
              <Highlighters />
            </Grid>
          </Grid>
          <InstructionModalButton />
        </>
      )}
    </>
  );
};

export default Semtex;

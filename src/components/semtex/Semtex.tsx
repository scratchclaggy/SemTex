import { Alert, AlertTitle, Grid, Stack, Typography } from "@mui/material";
import { atom, useSetAtom } from "jotai";
import { useRouter } from "next/router";
import useDataset from "src/hooks/dataset";
import useUserResponses from "src/hooks/user_responses";
import CommentInput from "./CommentInput";
import Highlighters from "./Highlighters";
import History from "./History";
import InstructionModal from "./instruction_modal/InstructionModal";
import InstructionModalButton from "./instruction_modal/InstructionModalButton";
import NavigationButtons from "./NavigationButtons";
import Progress from "./Progress";
import ResponseSelector from "./response_selector/ResponseSelector";
import TextSample from "./TextSample";

export const textSampleIdAtom = atom("");

const Semtex = () => {
  const router = useRouter();
  const datasetID = router.query.datasetID as string | undefined;
  const { dataset, datasetError } = useDataset(datasetID);
  const { userResponses, userResponsesError } = useUserResponses(datasetID);

  const setTextSampleID = useSetAtom(textSampleIdAtom);
  setTextSampleID("5cf7a58d-4c06-43d2-935e-e6779be659a2");

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
      {dataset && userResponses && (
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

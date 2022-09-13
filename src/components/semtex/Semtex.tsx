import { Alert, AlertTitle, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useDataset from "src/hooks/dataset";
import useUserResponses from "src/hooks/user_responses";
import CommentInput from "./CommentInput";
import Highlighters from "./Highlighters";
import History from "./history/History";
import {
  default as InstructionModal,
  default as InstructionModalButton,
} from "./instruction_modal/InstructionModal";
import NavigationButtons from "./NavigationButtons";
import Progress from "./Progress";
import ResponseSelector from "./response_selector/ResponseSelector";
import TextSample from "./TextSample";

export const textSampleIndexAtom = atom(0);
export const textSampleIdAtom = atom("");

const Semtex = () => {
  const router = useRouter();
  const datasetID = router.query.datasetID as string | undefined;
  const { dataset, datasetError } = useDataset(datasetID);
  const { userResponses, userResponsesError } = useUserResponses(datasetID);

  const textSampleIndex = useAtomValue(textSampleIndexAtom);
  const setTextSampleID = useSetAtom(textSampleIdAtom);

  useEffect(() => {
    setTextSampleID(dataset?.textSamples?.at(textSampleIndex)?.id ?? "");
  }, [textSampleIndex, dataset]);

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
          <Grid container columns={9} spacing={4}>
            <Grid item xs={2}>
              <History />
            </Grid>
            <Grid item xs={5}>
              <Stack justifyContent="space-between" height="80vh">
                <Box>
                  <Progress />
                  <TextSample />
                </Box>
                <Box>
                  <ResponseSelector />
                  <CommentInput />
                  <NavigationButtons />
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={2}>
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

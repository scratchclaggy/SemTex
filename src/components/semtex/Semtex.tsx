import { Alert, AlertTitle, Box, Grid, Stack, Typography } from "@mui/material";
import { atom, useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useDataset from "src/hooks/dataset";
import useUserResponses from "src/hooks/user_responses";
import { useSWRConfig } from "swr";
import CommentInput from "./CommentInput";
import Highlighters from "./Highlighters";
import History from "./history/History";
import InstructionModal from "./instruction_modal/InstructionModal";
import InstructionModalButton from "./instruction_modal/InstructionModalButton";
import NavigationButtons from "./NavigationButtons";
import Progress from "./Progress";
import ResponseSelector from "./response_selector/ResponseSelector";
import TextSample from "./TextSample";

export const navButtonIndexAtom = atom(0);
export const textSampleIdAtom = atom<string | undefined>(undefined);
export const userResponseIdAtom = atom<string | undefined>(undefined);

const Semtex = () => {
  const router = useRouter();
  const datasetID = router.query.datasetID as string | undefined;
  const { dataset, datasetError } = useDataset(datasetID);
  const { userResponses, userResponsesError } = useUserResponses(datasetID);

  const navButtonIndex = useAtomValue(navButtonIndexAtom);
  const [textSampleID, setTextSampleID] = useAtom(textSampleIdAtom);
  const [userResponseID, setUserResponseID] = useAtom(userResponseIdAtom);

  useEffect(() => {
    setTextSampleID(dataset?.textSamples.at(navButtonIndex)?.id);
  }, [dataset?.textSamples, setTextSampleID, navButtonIndex]);

  useEffect(() => {
    const userResponse = userResponses?.find(
      (ur) => ur.textSample.id === textSampleID
    );
    setUserResponseID(userResponse?.id ?? "");
  }, [userResponses, textSampleID, setUserResponseID]);

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
          <Grid container columns={12} spacing={8}>
            <Grid item xs={2} marginRight={8}>
              <History />
            </Grid>
            <Grid item xs={6} marginLeft={4}>
              <Stack justifyContent="space-between" height="80vh">
                <Box mt={2}>
                  <Progress />
                  <TextSample />
                  <NavigationButtons />
                  <ResponseSelector />
                </Box>
                <Box>
                  <CommentInput />
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Highlighters />
              <InstructionModalButton />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Semtex;

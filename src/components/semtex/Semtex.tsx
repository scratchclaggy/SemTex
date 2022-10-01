import { Alert, AlertTitle, Box, Grid, Stack, Typography } from "@mui/material";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useDataset from "src/hooks/dataset";
import useUserResponseList from "src/hooks/user_response_list";
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
  const { userResponseList, userResponseListError } =
    useUserResponseList(datasetID);

  const navButtonIndex = useAtomValue(navButtonIndexAtom);
  const [textSampleID, setTextSampleID] = useAtom(textSampleIdAtom);
  const setUserResponseID = useSetAtom(userResponseIdAtom);

  useEffect(() => {
    setTextSampleID(dataset?.textSamples.at(navButtonIndex)?.id);
  }, [dataset?.textSamples, setTextSampleID, navButtonIndex]);

  useEffect(() => {
    setUserResponseID(
      userResponseList?.find(
        (userResponse) => userResponse.textSampleID === textSampleID
      )?.id
    );
  }, [userResponseList, textSampleID, setUserResponseID]);

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
      {userResponseListError && (
        <Alert severity="error">
          <AlertTitle>Error {userResponseListError.code}</AlertTitle>
          <Typography>{userResponseListError.message}</Typography>
          {userResponseListError.details && (
            <Typography>Details: {userResponseListError.details}</Typography>
          )}
          {userResponseListError.hint && (
            <Typography>hint: {userResponseListError.hint}</Typography>
          )}
        </Alert>
      )}
      {dataset && userResponseList && (
        <div>
          <InstructionModal />
          <Grid container columns={12} spacing={3}>
            <Grid item xs={4}>
              <History />
            </Grid>
            <Grid item xs={5}>
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
        </div>
      )}
    </>
  );
};

export default Semtex;

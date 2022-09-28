import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useDataset from "src/hooks/dataset";
import useUserResponses from "src/hooks/user_responses";
import { Highlight } from "src/types/client";
import { highlightsDbAccess } from "src/utils/user_response";
import CommentInput from "./CommentInput";
import Highlighters from "./Highlighters";
import History from "./history/History";
import InstructionModal from "./instruction_modal/InstructionModal";
import InstructionModalButton from "./instruction_modal/InstructionModalButton";
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
  const { userResponses, userResponsesError, mutate } =
    useUserResponses(datasetID);

  const textSampleIndex = useAtomValue(textSampleIndexAtom);
  const setTextSampleID = useSetAtom(textSampleIdAtom);

  ///////////////////////////////////////////////////
  // DEMO

  const textSampleID = useAtomValue(textSampleIdAtom);

  const { highlights, insertHighlight, deleteHighlight } = highlightsDbAccess(
    userResponses,
    textSampleID,
    mutate
  );

  ///////////////////////////////////////////////////

  useEffect(() => {
    setTextSampleID(dataset?.textSamples?.at(textSampleIndex)?.id ?? "");
  }, [textSampleIndex, dataset, setTextSampleID]);

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
      {/* DEMO */}
      {highlights && <pre>{JSON.stringify(highlights, null, 2)}</pre>}
      <Button
        onClick={() => {
          console.log("ADD");
          const highlight: Highlight = {
            id: "",
            selection: "SELECTION",
            startIndex: 0,
            endIndex: 12,
            highlightOption: dataset?.highlightOptions[0],
          };

          insertHighlight(highlight);
        }}
      >
        ADD HIGHLIGHT
      </Button>
      <Button
        onClick={() => {
          console.log("DELETE");
          deleteHighlight(highlights[0].id);
        }}
      >
        DELETE HIGHLIGHT
      </Button>

      {/* DEMO */}
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

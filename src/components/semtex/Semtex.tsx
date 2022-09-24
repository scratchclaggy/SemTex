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
import { useEffect, useState } from "react";
import { deleteDataset, insertDataset } from "src/db/dataset";
import useDataset from "src/hooks/dataset";
import useDatasetList from "src/hooks/datasetList";
import useUserResponses from "src/hooks/user_responses";
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
  const { userResponses, userResponsesError } = useUserResponses(datasetID);

  const textSampleIndex = useAtomValue(textSampleIndexAtom);
  const setTextSampleID = useSetAtom(textSampleIdAtom);

  useEffect(() => {
    setTextSampleID(dataset?.textSamples?.at(textSampleIndex)?.id ?? "");
  }, [textSampleIndex, dataset, setTextSampleID]);

  const { datasetList, datasetListError } = useDatasetList();
  const [response, setResponse] = useState<any>(null);

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
      {datasetListError && (
        <pre>{JSON.stringify(datasetListError, null, 4)}</pre>
      )}
      {datasetList && <pre>{JSON.stringify(datasetList, null, 4)}</pre>}
      {response && <pre>{JSON.stringify(response, null, 4)}</pre>}
      <Button
        onClick={async () => {
          const newDataset = {
            name: "From Frontend",
            passkey: "new passkey",
            instructions: "",
            text_samples: [{ body: "Some text sample" }],
            highlight_options: [{ label: "my highlighter", color: "#FFFFFF" }],
            response_options: [
              {
                label: "New Option",
              },
            ],
          };

          insertDataset(newDataset);
        }}
      >
        New Dataset
      </Button>
      <Button
        onClick={() => {
          deleteDataset("c0139742-62ec-4560-9dee-c894a7de3fe2");
        }}
      >
        Delete Dataset
      </Button>
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

import { Alert, AlertTitle, Grid, Stack, Typography } from "@mui/material";
import useAuth from "src/contexts/AuthContext";
import useDataset from "src/hooks/dataset";
import useUrHighlights from "src/hooks/user_response/highlights";
import CommentInput from "./CommentInput";
import Highlighters from "./Highlighters";
import History from "./History";
import InstructionModal from "./instruction_modal/InstructionModal";
import InstructionModalButton from "./instruction_modal/InstructionModalButton";
import NavigationButtons from "./NavigationButtons";
import Progress from "./Progress";
import ResponseSelector from "./response_selector/ResponseSelector";
import TextSample from "./TextSample";

/* TODO:
 *
 * - Pass in the text-sample ID rather then the user response ID
 * - Use ResponseOptions instead of IDs so it behaves like the highlight_options
 * - Error handling when dataset / other things do not exist
 *
 */

const Semtex = () => {
  const { user } = useAuth();
  const { dataset, datasetError } = useDataset(user?.user_metadata.dataset);
  const { highlights, insertHighlight, updateHighlight, deleteHighlight } =
    useUrHighlights(dataset?.id, "8df338c3-6396-49d1-adf1-4c5c027293b9");

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
      {highlights && <pre>{JSON.stringify(highlights, null, 4)}</pre>}
      {/* dataset && <pre>{JSON.stringify(dataset, null, 4)}</pre> */}
      {
        // <button
        // onClick={() => {
        // const randInt = Math.random() * 100;
        // console.log(randInt);
        //
        // updateComment(
        //     "8df338c3-6396-49d1-adf1-4c5c027293b9",
        //     randInt.toString()
        //     );
        // }}
        // >
        //   change comment
        //   </button>
      }
      <button
        onClick={() => {
          const randInt = Math.random() * 100;
          console.log(randInt);

          insertHighlight(randInt.toString(), dataset!.highlightOptions[0]);
        }}
      >
        new highlight
      </button>
      <button
        onClick={() => {
          const randInt = Math.random() * 100;
          console.log(randInt);

          updateHighlight(
            "3e2b5b53-ac11-4aa0-a5f0-a2ef67bfd8b2",
            randInt.toString(),
            dataset!.highlightOptions[0]
          );
        }}
      >
        update highlight
      </button>
      <button
        onClick={() => {
          deleteHighlight("3e2b5b53-ac11-4aa0-a5f0-a2ef67bfd8b2");
        }}
      >
        delete highlight
      </button>
      {/* 
        <button
          onClick={() => {
            updateResponse(
                "8df338c3-6396-49d1-adf1-4c5c027293b9",
                "f4067846-3493-4345-93bb-5e1bb570153a"
                );
          }}
        >
          change response option
          </button>
          */}
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

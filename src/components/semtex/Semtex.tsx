import { Alert, AlertTitle, Grid, Stack, Typography } from "@mui/material";
import useAuth from "src/contexts/AuthContext";
import { useDataset } from "src/hooks/db";
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
  const { dataset, error } = useDataset(user?.user_metadata.dataset);

  return (
    <>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error {error.code}</AlertTitle>
          <Typography>{error.message}</Typography>
          {error.details && <Typography>Details: {error.details}</Typography>}
          {error.hint && <Typography>hint: {error.hint}</Typography>}
        </Alert>
      )}
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
            <Grid item justifyContent='flex-end'>
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

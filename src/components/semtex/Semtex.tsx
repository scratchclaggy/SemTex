import { Alert, AlertTitle, Box, Grid, Stack, Typography } from "@mui/material";
import useUserStore from "src/hooks/auth";
import { useDataset } from "src/hooks/db";
import CommentInput from "./CommentInput";
import Highlighters from "./Highlighters";
import History from "./History";
import InstructionModalButton from "./instruction_modal/InstructionModalButton";
import NavigationButtons from "./NavigationButtons";
import Progress from "./Progress";
import ResponseSelector from "./response_selector/ResponseSelector";
import TextSample from "./TextSample";

const Semtex = () => {
  const user = useUserStore((state) => state.user);
  /*const router = useRouter();
  if (user == null) {
    router.push('/');
    return null
  }*/

  const { dataset, error } = useDataset("3");
  console.log(dataset);
  console.log(error);

  return (
    <>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error {error.code}</AlertTitle>
          {error.message}
          {error.details}
          {error.hint && `(hint: ${error.hint})`}
        </Alert>
      )}
      {dataset && (
        <Box>
          {/* <InstructionModal /> */}
          {user && <Typography variant="h5">{user.email}</Typography>}
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
        </Box>
      )}
    </>
  );
};

export default Semtex;

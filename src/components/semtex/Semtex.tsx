import { Box, Grid, Stack, Typography } from "@mui/material";
import useUserStore from "src/hooks/auth";
import { useDataSet } from "src/hooks/db";
import supabase from "utils/supabase";
import CommentInput from "./CommentInput";
import Highlighters from "./Highlighters";
import History from "./History";
import InstructionModalButton from "./instruction_modal/InstructionModalButton";
import NavigationButtons from "./NavigationButtons";
import Progress from "./Progress";
import ResponseSelector from "./response_selector/ResponseSelector";
import TextSample from "./TextSample";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";

const Semtex = () => {
  const user = useUserStore((state) => state.user);
  /*const router = useRouter();
  if (user == null) {
    router.push('/');
    return null
  }*/

  const { dataset, error } = useDataSet(user?.user_metadata.dataset);

  {error && <Alert severity="error">{error?.message}</Alert>}

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
  );
  }
};

export default Semtex;

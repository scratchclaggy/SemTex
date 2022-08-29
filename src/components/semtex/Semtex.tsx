import { Box, Grid, Stack, Typography } from "@mui/material";
import useUserStore from "src/hooks/auth";
import CommentInput from "./CommentInput";
import Highlighters from "./Highlighters";
import History from "./History";
import InstructionModalButton from "./instruction_modal/InstructionModalButton";
import NavigationButtons from "./NavigationButtons";
import Progress from "./Progress";
import ResponseSelector from "./response_selector/ResponseSelector";
import TextSample from "./TextSample";

const Semtex = () => {
  const user = useUserStore((state) => state.user)

  return (
    <Box>
      
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
};

export default Semtex;

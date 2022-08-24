import { Grid, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useDataSet } from "src/hooks";
import supabase from "utils/supabase";
import CommentInput from "./CommentInput";
import Highlighters from "./Highlighters";
import History from "./History";
import InstructionModalButton from "./instruction_modal/InstructionModalButton";
import NavigationButtons from "./NavigationButtons";
import Progress from "./Progress";
import ResponseSelector from "./response_selector/ResponseSelector";
import TextSample from "./TextSample";

const Semtex = () => {
  // grabbing from hooks.tsx, placeholder for now until we can grab datasetID.
  const myfunc = async () => {
    const { user, error } = await supabase.auth.update({
      data: { dataset: 'c01a356f-12a1-44f0-bbb7-bb39f560e76e'}
    });
    console.log(user);
  }
  myfunc();
  const { data, error } = useDataSet("c01a356f-12a1-44f0-bbb7-bb39f560e76e");

  console.log(data);

  return (
    <Box>
      {/* <InstructionModal /> */}
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

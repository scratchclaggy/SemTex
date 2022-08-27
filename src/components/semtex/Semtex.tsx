import { Box, Grid, Stack, Typography } from "@mui/material";
import useUserStore from "src/hooks/auth";
import CommentInput from "./CommentInput";
import Highlighters from "./Highlighters";
import History from "./History";
import InstructionModal from "./instruction_modal/InstructionModal";
import InstructionModalButton from "./instruction_modal/InstructionModalButton";
import NavigationButtons from "./NavigationButtons";
import Progress from "./Progress";
import ResponseSelector from "./response_selector/ResponseSelector";

import TextSample from "./TextSample";

// TODO: Retrieve the dataset via SWR
export const dataset = {
  responses: [
    "Bush Fire",
    "Climate Change",
    "Unknown",
    // "AdditionalAdditionalAdditionalAdditionalAdditional A",
    // "Additional B",
    // "Additional C",
  ],
  highlighters: [
    { color: "#e5f5f9", label: "Low emphasis" },
    { color: "#99d8c9", label: "Medium emphasis" },
    { color: "#2ca25f", label: "High emphasis" },
  ],
  textSamples: [
    {
      body: "Sed a bibendum ex, nec venenatis magna. Nunc sagittis tincidunt dui, at posuere nisi. Etiam hendrerit nec dolor eu blandit. Maecenas turpis.",
      id: "852ca1e5-a345-4a09-956b-a53c8a1d4ec5",
    },
    {
      body: "Maecenas nec mauris sit amet mauris efficitur viverra. Phasellus sodales est est, a venenatis dui dignissim id. Sed ut lacus vitae pharetra.",
      id: "4c640cc9-f466-4377-9bec-f8ad6f622751",
    },
    {
      body: "Vivamus a facilisis dolor. In vel sem quis lectus pulvinar dapibus nec ut tortor. Suspendisse potenti. Sed iaculis laoreet mauris at tellus.",
      id: "fbfcdcb4-8cd8-4b49-bdf2-f51ef614f9e6",
    },
    {
      body: "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut commodo urna sed ultricies imperdiet.",
      id: "d1617456-7ebb-43ec-bf2b-9f87a3074f15",
    },
    {
      body: "Quisque tortor lectus, mollis vel felis a, elementum vestibulum eros. Nullam accumsan turpis at ipsum dapibus pellentesque. Integer tempor sapien vel ante molestie blandit. Aenean sed condimentum lectus.",
      id: "e34c400f-1553-4c07-8c25-6d9d27175e47",
    },
  ],
  instructions:
    "Ut elit urna, ultricies eget ipsum faucibus, imperdiet viverra nisl. Vestibulum luctus, ante at porttitor porttitor, ligula ex luctus sem, non dignissim risus mauris imperdiet mi. Nullam ut tellus tristique quam euismod consequat in id diam. Integer ac egestas mi. Donec aliquam finibus nibh, quis vehicula libero suscipit vel. Donec ac imperdiet nisl, in interdum sapien. Maecenas pellentesque arcu et enim feugiat vulputate. Donec facilisis egestas magna.",
};

const Semtex = () => {
  const user = useUserStore((state) => state.user);

  return (
    <Box>
      <InstructionModal />
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

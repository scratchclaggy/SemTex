import { Box, Typography } from "@mui/material";

type TextSampleProps = {
  samples: { body: string; id: string }[];
};

const TextSample = ({ samples }: TextSampleProps) => {
  return (
    <Box>
      <Typography>{samples[0].body}</Typography>
    </Box>
  );
};

export default TextSample;

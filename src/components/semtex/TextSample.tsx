import { Typography } from "@mui/material";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import useDataset from "src/hooks/dataset";
import { textSampleIndexAtom } from "./Semtex";

const TextSample = () => {
  const router = useRouter();
  const { dataset } = useDataset(router.query.datasetID as string | undefined);
  const textSampleIndex = useAtomValue(textSampleIndexAtom);

  const textSample = dataset?.textSamples[textSampleIndex]?.body ?? "";

  return <Typography>{textSample}</Typography>;
};

export default TextSample;

import { Button, Stack } from "@mui/material";
import { useSetAtom } from "jotai";
import { useRouter } from "next/router";
import useDataset from "src/hooks/dataset";
import { textSampleIndexAtom } from "./Semtex";

const NavigationButtons = () => {
  const router = useRouter();
  const { dataset } = useDataset(router.query.datasetID as string | undefined);

  const textSampleLength = dataset?.textSamples?.length ?? 0;

  const setTextSampleIndex = useSetAtom(textSampleIndexAtom);

  return (
    <Stack direction="row" justifyContent="space-between" padding={2}>
      <Button
        style={{ borderRadius: "16px", backgroundColor: "white", width: "20%" }}
        onClick={() =>
          setTextSampleIndex(
            (prev) => (prev + textSampleLength - 1) % textSampleLength
          )
        }
      >
        Previous
      </Button>
      <Button
        style={{ borderRadius: "16px", backgroundColor: "white", width: "20%" }}
        onClick={() =>
          setTextSampleIndex((prev) => (prev + 1) % textSampleLength)
        }
      >
        Next
      </Button>
    </Stack>
  );
};

export default NavigationButtons;

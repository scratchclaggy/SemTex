import { PostgrestError } from "@supabase/supabase-js";
import { Dataset } from "src/types/client";
import useSWR from "swr";
import supabase from "utils/supabase";

type SingleDataSet = Omit<Dataset, "name" | "created">;

const useDataset = (
  datasetID: string | undefined
): {
  dataset: SingleDataSet | undefined | null;
  datasetError: PostgrestError | null;
} => {
  const { data: dataset, error: datasetError } = useSWR(
    datasetID && "dataset",
    async () => {
      const {
        data,
        error,
      }: {
        data: SingleDataSet | null;
        error: PostgrestError | null;
      } = await supabase
        .from("dataset")
        .select(
          `
          id,
          textSamples:text_sample(id, body),
          highlightOptions:highlight_option(id, label, color),
          responseOptions:response_option(id, label),
          instructions
        `
        )
        .eq("id", datasetID)
        .single();

      if (error) throw error;

      return data;
    }
  );

  return {
    dataset,
    datasetError,
  };
};

export default useDataset;

import { PostgrestError } from "@supabase/supabase-js";
import { Dataset } from "src/types/client";
import supabase from "src/utils/supabase";
import useSWR from "swr";

type SingleDataSet = Omit<Dataset, "name" | "created">;

const useDataset = (datasetID: string | undefined) => {
  const { data, error } = useSWR(datasetID && "dataset", async () => {
    const { data, error } = await supabase
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
  });

  return {
    dataset: data as SingleDataSet | undefined,
    datasetError: error as PostgrestError | null,
  };
};

export default useDataset;

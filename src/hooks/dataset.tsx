import { PostgrestError } from "@supabase/supabase-js";
import { Dataset } from "src/types/client";
import supabase from "src/utils/supabase";
import useSWRImmutable from "swr/immutable";

const useDataset = (datasetID: string | undefined) => {
  const { data, error } = useSWRImmutable(datasetID && "dataset", async () => {
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
    dataset: data as Dataset | undefined,
    datasetError: error as PostgrestError | null,
  };
};

export default useDataset;

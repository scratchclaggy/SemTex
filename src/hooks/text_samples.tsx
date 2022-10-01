import { PostgrestError } from "@supabase/supabase-js";
import { TextSample } from "src/types/client";
import supabase from "src/utils/supabase";
import useSWR from "swr";

const useTextSamples = (datasetID: string | undefined) => {
  const { data, error } = useSWR(
    datasetID && `textSamples/${datasetID}`,
    async () => {
      const { data, error } = await supabase
        .from("text_sample")
        .select("id, body, dataset_id")
        .eq("dataset_id", datasetID);

      if (error) throw error;

      return data;
    }
  );

  return {
    textSamples: data as TextSample[] | undefined,
    textSamplesError: error as PostgrestError | null,
  };
};

export default useTextSamples;

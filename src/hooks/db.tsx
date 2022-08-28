import { PostgrestError } from "@supabase/supabase-js";
import { Dataset } from "src/types";
import useSWR from "swr";
import supabase from "utils/supabase";

export const useDataset = (
  id: string
): {
  dataset: Dataset | null | unknown;
  isLoading: boolean;
  error: PostgrestError | null;
} => {
  const { data, error } = useSWR("dataset", async () => {
    const { data, error } = await supabase
      .from("dataset")
      .select(
        `id,
        textSamples:text_sample(id, body),
        highlights:highlight_option(id, label, color),
        responses:response_option(id, label)`
      )
      .eq("id", id)
      .single();

    return { data: { dataset: data, pgError: error } };
  });

  if (!data) {
    return {
      dataset: null,
      isLoading: false,
      error: error,
    };
  }

  const { dataset, pgError: pgError } = data.data;

  return {
    dataset,
    isLoading: !dataset && !pgError,
    error: pgError,
  };
};

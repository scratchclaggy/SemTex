import useSWR from "swr";
import supabase from "utils/supabase";
import { DefaultDeserializer } from "v8";

export const useDataSet = (id: string) => {
  const { data, error } = useSWR("dataset", async () => {
    // Make this function return a single dataset with all of the relevant joins
    const { data, error } = await supabase.from("dataset").select(`id,
    highlights:highlight_option(id, label),
    textSample:text_sample(id, body)
    `);

    return data;
  });

  return {
    data,
    isLoading: !error && !data,
    error,
  };
};

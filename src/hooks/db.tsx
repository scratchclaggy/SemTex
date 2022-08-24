import useSWR from "swr";
import supabase from "utils/supabase";
import { DefaultDeserializer } from "v8";

export const useDataSet = (id: string) => {
  const { data, error } = useSWR("dataset", async () => {
    // Make this function return a single dataset with all of the relevant joins
    const { data, error } = await supabase
      .from('dataset')
      .select(`id,
      textSamples:text_sample(id, body),
      highlights:highlight_option(id, label, color),
      responses:response_option(id, label)
      `)
      .eq('id', id)
      .single();
    return data;
  });

  return {
    data,
    isLoading: !error && !data,
    error,
  };
};

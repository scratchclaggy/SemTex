import useSWR from "swr";
import supabase from "utils/supabase";
import { DefaultDeserializer } from "v8";

export const useDataSet = (id: string) => {
  const { data: dataset, error } = useSWR("dataset", async () => {
    const { data, error } = await supabase
      .from('dataset')
      .select(`
        id,
        textSamples:text_sample(id, body),
        highlights:highlight_option(id, label, color),
        responses:response_option(id, label)
      `)
      .eq('id', id)
      .single();
    if (error) {
      throw `Error ${error.code}: ${error.message} 
      ${error.details}
      ${error.hint && `(hint: ${error.hint})`}`.trim();
    }
    return data;
  });

  return {
    dataset,
    isLoading: !error && !dataset,
    error,
  };
};

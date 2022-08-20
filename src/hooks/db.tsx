import useSWR from "swr";
import supabase from "utils/supabase";

export const useDataSet = (id: string) => {
  const { data, error } = useSWR(async () => {
    // Make this function return a single dataset with all of the relevant joins
    const data = await supabase.from("dataset").select();
  });

  return {
    data,
    isLoading: !error && !data,
    error,
  };
};

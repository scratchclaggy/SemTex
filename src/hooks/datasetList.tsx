import { PostgrestError } from "@supabase/supabase-js";
import { ListDataset } from "src/types/client";
import supabase from "src/utils/supabase";
import useSWR from "swr";

const useDatasetList = () => {
  const { data, error } = useSWR(
    "datasetList",
    async () => {
      const { data, error } = await supabase
        .from("dataset")
        .select("id, name, created, passkey");

      if (error !== null) throw error;

      return data;
    },
    { revalidateOnFocus: false }
  );

  return {
    datasetList: data?.map((dataset) => {
      return { ...dataset, created: new Date(dataset.created) };
    }) as ListDataset[] | undefined,
    datasetListError: error as PostgrestError | null,
  };
};

export default useDatasetList;

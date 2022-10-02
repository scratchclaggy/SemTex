import { PostgrestError } from "@supabase/supabase-js";
import supabase from "src/utils/supabase";
import useSWR from "swr";

const useUserResponseList = (datasetID: string | undefined) => {
  const { data, error } = useSWR(
    datasetID,
    async () => {
      const { data, error } = await supabase
        .from("user_response")
        .select(
          `
          id,
          text_sample!inner(
            id, dataset_id
          ),
          response_option_id,
          highlight(id)
        `
        )
        .eq("text_sample.dataset_id", datasetID);

      if (error) throw error;

      return data;
    },
    { revalidateOnFocus: false }
  );

  return {
    userResponseList: data?.map((userResponse) => {
      return {
        id: userResponse.id,
        textSampleID: userResponse.text_sample?.id,
        hasResponse: userResponse.response_option_id !== null,
        hasHighlight: userResponse.highlight.length !== 0,
      };
    }),
    userResponseListError: error as PostgrestError | null,
  };
};

export default useUserResponseList;

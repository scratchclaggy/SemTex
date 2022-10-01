import { PostgrestError } from "@supabase/supabase-js";
import { UserResponse } from "src/types/client";
import supabase from "src/utils/supabase";
import useSWR from "swr";

const useUserResponses = (datasetID: string | undefined) => {
  const { data, error, mutate } = useSWR(
    datasetID,
    async () => {
      const { data, error } = await supabase
        .from("user_response")
        .select(
          `
            id,
            response:response_option(id, label),
            comments,
            textSample:text_sample!inner(id, datsetID:dataset_id)
          `
        )
        .eq("text_sample.dataset_id", datasetID);

      if (error) throw error;

      return data;
    }
  );

  return {
    userResponses: data as UserResponse[] | undefined,
    userResponsesError: error as PostgrestError | null,
    mutate,
  };
};

export default useUserResponses;

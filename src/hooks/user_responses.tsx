import { PostgrestError } from "@supabase/supabase-js";
import useSWR from "swr";
import { UserResponse } from "../types/client";
import supabase from "../utils/supabase";

const useUserResponses = (datasetID: string | undefined) => {
  const { data, error, mutate } = useSWR(
    datasetID && "userResponses",
    async () => {
      const { data, error } = await supabase
        .from("user_response")
        .select(
          `
            id,
            response:response_option(id, label),
            comments,
            highlights:highlight(id, selection, highlightOption:highlight_option(id, label, color)),
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

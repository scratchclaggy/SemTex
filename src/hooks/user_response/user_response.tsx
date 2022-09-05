import { PostgrestError } from "@supabase/supabase-js";
import { UserResponse } from "src/types/client";
import useSWR, { SWRResponse } from "swr";
import supabase from "utils/supabase";

const useUserResponse = (datasetID: string) => {
  const {
    data: userResponses,
    error: userResponsesError,
  }: SWRResponse<UserResponse[] | null, PostgrestError | null> = useSWR(
    "userResponses",
    async () => {
      const {
        data,
        error,
      }: {
        data: UserResponse[] | null;
        error: PostgrestError | null;
      } = await supabase
        .from("user_response")
        .select(
          `
            id,
            response:response_option(id),
            comments,
            highlights:highlight(id, selection, highlightOption:highlight_option(id, label, color)),
            textSample:text_sample(id, datsetID:dataset_id)
          `
        )
        .eq("textSample.dataset_id", datasetID);

      if (error) throw error;

      return data;
    }
  );

  return {
    userResponses,
    userResponsesError,
  };
};

export default useUserResponse;

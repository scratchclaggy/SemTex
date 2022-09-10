import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useCallback } from "react";
import { UserResponse } from "src/types/client";
import { partitionUserResponse } from "src/utils";
import { useSWRConfig } from "swr";
import supabase from "utils/supabase";
import useUserResponse from "./user_response";

const useUrComment = (
  datasetID: string | undefined,
  textSampleID: string | undefined
) => {
  const { userResponses } = useUserResponse(datasetID);
  const { mutate } = useSWRConfig();

  const { matchingResponse, filteredResponses } = partitionUserResponse(
    userResponses,
    textSampleID
  );

  const updateComment = useCallback(
    (newComment: string) => {
      if (matchingResponse === undefined) {
        return;
      }

      mutate(
        "userResponses",
        async () => {
          const { data: res, error }: PostgrestSingleResponse<UserResponse> =
            await supabase
              .from("user_response")
              .update({ comments: newComment })
              .eq("id", matchingResponse?.id)
              .single();

          if (error) throw error;

          return [
            ...filteredResponses,
            { ...matchingResponse, comments: res.comments },
          ];
        },
        {
          optimisticData: [
            ...filteredResponses,
            { ...matchingResponse, comments: newComment },
          ],
          rollbackOnError: true,
        }
      );
    },
    [userResponses]
  );

  return { comment: matchingResponse?.comments, updateComment };
};

export default useUrComment;

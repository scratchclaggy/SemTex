import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { UserResponse } from "src/types/db";
import { useSWRConfig } from "swr";
import supabase from "utils/supabase";
import useUserResponse from "./user_response";

const useUrComment = (datasetID: string, userResponseID: string) => {
  const { userResponses } = useUserResponse(datasetID);

  const updateResponse = userResponses?.find(
    (response) => response.id === userResponseID
  );

  if (!updateResponse) return null;

  const { mutate } = useSWRConfig();

  const updateComment = (newComment: string) => {
    const filteredResponses =
      userResponses?.filter((response) => response.id !== userResponseID) ?? [];

    const updateResponse = userResponses?.find(
      (response) => response.id === userResponseID
    );

    mutate(
      "userResponses",
      async () => {
        const { data: res, error }: PostgrestSingleResponse<UserResponse> =
          await supabase
            .from("user_response")
            .update({ comments: newComment })
            .eq("id", userResponseID)
            .single();

        if (error) throw error;

        return [
          ...filteredResponses,
          { ...updateResponse, comments: res.comments },
        ];
      },
      {
        optimisticData: [
          ...filteredResponses,
          { ...updateResponse, comments: newComment },
        ],
        rollbackOnError: true,
      }
    );
  };

  return { comment: updateComment, updateComment };
};

export default useUserResponseComment;

import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { UserResponse } from "src/types/client";
import { useSWRConfig } from "swr";
import supabase from "utils/supabase";
import useUserResponse from "./user_response";

const useUrComment = (
  datasetID: string | undefined,
  textSampleID: string | undefined
) => {
  const { userResponses } = useUserResponse(datasetID);
  const { mutate } = useSWRConfig();

  const updateResponse = userResponses?.find(
    (response) => response.textSample.id === textSampleID
  );

  console.log("useurcomment", datasetID, textSampleID);
  console.log(userResponses, updateResponse);

  if (!updateResponse)
    return {
      comment: "",
      updateComment: () => {},
    };

  const updateComment = (newComment: string) => {
    mutate(
      "userResponses",
      async (userResponses: UserResponse[]) => {
        const filteredResponses =
          userResponses?.filter(
            (response) => response.textSample.id !== textSampleID
          ) ?? [];

        const { data: res, error }: PostgrestSingleResponse<UserResponse> =
          await supabase
            .from("user_response")
            .update({ comments: newComment })
            .eq("id", updateResponse.id)
            .single();

        console.log("UPDATE", res, error);

        if (error) throw error;

        return [
          ...filteredResponses,
          { ...updateResponse, comments: res.comments },
        ];
      },
      {
        revalidate: false,
      }
    );
  };

  return { comment: updateResponse.comments, updateComment };
};

export default useUrComment;

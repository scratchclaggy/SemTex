import { partitionUserResponse } from "src/utils";
import supabase from "utils/supabase";
import useUserResponse from "./user_response";

const useUrComment = (
  datasetID: string | undefined,
  textSampleID: string | undefined
) => {
  const { userResponses, mutate } = useUserResponse(datasetID);

  const { matchingResponse } = partitionUserResponse(
    userResponses,
    textSampleID
  );

  const updateComment = async (newComment: string) => {
    if (matchingResponse === undefined) {
      return;
    }

    await supabase
      .from("user_response")
      .update({ comments: newComment })
      .eq("id", matchingResponse?.id)
      .single();

    mutate();
  };

  return { comment: matchingResponse?.comments, updateComment };
};

export default useUrComment;

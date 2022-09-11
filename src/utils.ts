import { KeyedMutator } from "swr";
import supabase from "utils/supabase";
import { UserResponse } from "./types/client";

export const partitionUserResponse = (
  userResponses: UserResponse[] | null | undefined,
  textSampleID: string | undefined
) => {
  const matchingResponse = userResponses?.find(
    (response) => response.textSample?.id === textSampleID
  );

  const filteredResponses =
    userResponses?.filter(
      (response) => response.textSample?.id !== textSampleID
    ) ?? [];

  return { matchingResponse, filteredResponses };
};

export const commentDbAccess = (
  userResponses: UserResponse[] | undefined,
  textSampleID: string,
  mutate: KeyedMutator<any>
) => {
  const { matchingResponse } = partitionUserResponse(
    userResponses,
    textSampleID
  );
  const comment = matchingResponse?.comments ?? "";

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

  return { comment, updateComment };
};

export const responseOptionDbAccess = (
  userResponses: UserResponse[] | undefined,
  textSampleID: string,
  mutate: KeyedMutator<any>
) => {
  const { matchingResponse } = partitionUserResponse(
    userResponses,
    textSampleID
  );
  const responseOption = matchingResponse?.response;

  const updateResponseOption = async (responseOptionID: string) => {
    if (matchingResponse === undefined) {
      return;
    }

    await supabase
      .from("user_response")
      .update({
        response_option_id: responseOptionID,
      })
      .eq("id", matchingResponse.id)
      .single();

    mutate();
  };

  return { responseOption, updateResponseOption };
};

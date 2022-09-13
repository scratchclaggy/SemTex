import { Highlight, HighlightOption, UserResponse } from "src/types/client";
import supabase from "src/utils/supabase";
import { KeyedMutator } from "swr";

const findMatchingResponse = (
  userResponses: UserResponse[] | null | undefined,
  textSampleID: string | undefined
) => {
  return userResponses?.find(
    (response) => response.textSample?.id === textSampleID
  );
};

export const commentDbAccess = (
  userResponses: UserResponse[] | undefined,
  textSampleID: string,
  mutate: KeyedMutator<any>
) => {
  const matchingResponse = findMatchingResponse(userResponses, textSampleID);
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
  const matchingResponse = findMatchingResponse(userResponses, textSampleID);
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

export const highlightsDbAccess = (
  userResponses: UserResponse[] | undefined,
  textSampleID: string,
  mutate: KeyedMutator<any>
) => {
  const matchingResponse = findMatchingResponse(userResponses, textSampleID);

  const highlights = matchingResponse?.highlights ?? [];

  const insertHighlight = async (
    selection: string,
    highlightOption: HighlightOption | undefined
  ) => {
    if (matchingResponse === undefined || highlightOption === undefined) return;

    const { data } = await supabase
      .from("highlight")
      .insert({
        selection,
        highlight_option: highlightOption.id,
        user_response_id: matchingResponse.id,
      })
      .single();

    mutate();

    return data as Highlight;
  };

  const updateHighlightSelection = async (
    highlightID: string,
    selection: string
  ) => {
    if (matchingResponse === undefined) return;

    await supabase
      .from("highlight")
      .update({ selection })
      .eq("id", highlightID);

    mutate();
  };

  const deleteHighlight = async (highlightID: string) => {
    if (matchingResponse === undefined) return;

    await supabase.from("highlight").delete().eq("id", highlightID);

    mutate();
  };

  return {
    highlights,
    insertHighlight,
    updateHighlightSelection,
    deleteHighlight,
  };
};

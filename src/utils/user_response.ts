import { Highlight, UserResponse } from "src/types/client";
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

  const insertHighlight = async (highlight: Omit<Highlight, "id">) => {
    console.log("SANITY")
    if (matchingResponse === undefined || highlight.highlightOption === undefined)
      return;

    const { data, error } = await supabase
      .from("highlight")
      .insert({
        selection: highlight.selection,
        start_index: highlight.startIndex,
        end_index: highlight.endIndex,
        highlight_option: highlight.highlightOption.id,
        user_response_id: matchingResponse.id,
      })
      .single();

    console.log(data, error)

    mutate();

    return data as Highlight;
  };

  const deleteHighlight = async (highlightID: string) => {
    if (matchingResponse === undefined) return;

    await supabase.from("highlight").delete().eq("id", highlightID);

    mutate();
  };

  return {
    highlights,
    insertHighlight,
    deleteHighlight,
  };
};

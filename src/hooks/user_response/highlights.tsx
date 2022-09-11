import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Highlight, HighlightOption } from "src/types/client";
import { partitionUserResponse } from "src/utils";
import supabase from "utils/supabase";
import useUserResponse from "./user_response";

const partitionHighlight = (highlights: Highlight[], highlightID: string) => {
  const matchingHighlight = highlights.find(
    (highlight) => highlight.id === highlightID
  );

  const filteredHighlights =
    highlights.filter((highlight) => highlight.id !== highlightID) ?? [];

  return { matchingHighlight, filteredHighlights };
};

const useUrHighlights = (
  datasetID: string | undefined,
  textSampleID: string | undefined
) => {
  const { userResponses, mutate } = useUserResponse(datasetID);

  const { matchingResponse } = partitionUserResponse(
    userResponses,
    textSampleID
  );

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

  const updateHighlightSelection = (highlightID: string, selection: string) => {
    const filteredHighlights =
      updateResponse.highlights?.filter(
        (highlight) => highlight.id !== highlightID
      ) ?? [];

    const updateHighlight = updateResponse.highlights?.find(
      (highlight) => highlight.id === highlightID
    );

    if (!updateHighlight) return;

    mutate(
      "userResponses",
      async () => {
        const { data: res, error }: PostgrestSingleResponse<Highlight> =
          await supabase
            .from("highlight")
            .update({
              selection,
            })
            .eq("id", highlightID)
            .single();

        if (error) throw error;

        return [
          ...filteredResponses,
          {
            ...updateResponse,
            highlights: [
              ...filteredHighlights,
              { ...updateHighlight, selection: res.selection },
            ],
          },
        ];
      },
      {
        optimisticData: [
          ...filteredResponses,
          {
            ...updateResponse,
            highlights: [
              ...filteredHighlights,
              { ...updateHighlight, selection },
            ],
          },
        ],
        rollbackOnError: true,
      }
    );
  };

  const deleteHighlight = (highlightID: string) => {
    const filteredHighlights = partitionHighlight(
      matchingResponse!.highlights ?? [],
      highlightID
    );

    mutate(
      "userResponses",
      async () => {
        const { error } = await supabase
          .from("highlight")
          .delete()
          .eq("id", highlightID);

        if (error) throw error;

        return [
          ...filteredResponses,
          {
            ...matchingResponse,
            highlights: filteredHighlights,
          },
        ];
      },
      {
        optimisticData: [
          ...filteredResponses,
          {
            ...matchingResponse,
            highlights: filteredHighlights,
          },
        ],
        rollbackOnError: true,
      }
    );
  };

  return {
    highlights: matchingResponse?.highlights ?? [],
    insertHighlight,
    updateHighlightSelection,
    deleteHighlight,
  };
};

export default useUrHighlights;

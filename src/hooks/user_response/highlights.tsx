import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { HighlightOption } from "src/types/client";
import { Highlight } from "src/types/db";
import { useSWRConfig } from "swr";
import supabase from "utils/supabase";
import useUserResponse from "./user_response";

const useUrHighlights = (
  datasetID: string | undefined,
  textSampleID: string | undefined
) => {
  const { userResponses } = useUserResponse(datasetID);
  const { mutate } = useSWRConfig();

  const updateResponse = userResponses?.find(
    (response) => response.textSample.id === textSampleID
  );

  if (!userResponses || !updateResponse) {
    return {
      highlights: [],
      insertHighlight: () => {},
      updateHighlightSelection: () => {},
      deleteHighlight: () => {},
    };
  }

  const filteredResponses =
    userResponses?.filter(
      (response) => response.textSample.id !== textSampleID
    ) ?? [];

  const insertHighlight = (
    selection: string,
    highlightOption: HighlightOption
  ) => {
    const newHighlight = { id: "", selection, highlightOption };

    mutate(
      "userResponses",
      async () => {
        const { data: res, error }: PostgrestSingleResponse<Highlight> =
          await supabase
            .from("highlight")
            .insert({
              selection,
              highlight_option: highlightOption.id,
              user_response_id: updateResponse.id,
            })
            .single();

        if (error) throw error;

        return [
          ...filteredResponses,
          {
            ...updateResponse,
            highlights: [
              ...(updateResponse.highlights ?? []),
              { ...newHighlight, selection: res.selection },
            ],
          },
        ];
      },
      {
        optimisticData: [
          ...filteredResponses,
          {
            ...updateResponse,
            highlights: [...(updateResponse.highlights ?? []), newHighlight],
          },
        ],
        rollbackOnError: true,
      }
    );
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
    const filteredHighlights =
      updateResponse.highlights?.filter(
        (highlight) => highlight.id !== highlightID
      ) ?? [];

    mutate(
      "userResponses",
      async () => {
        const { data: res, error } = await supabase
          .from("highlight")
          .delete()
          .eq("id", highlightID);

        console.log(res, error);

        if (error) throw error;

        return [
          ...filteredResponses,
          {
            ...updateResponse,
            highlights: filteredHighlights,
          },
        ];
      },
      {
        optimisticData: [
          ...filteredResponses,
          {
            ...updateResponse,
            highlights: filteredHighlights,
          },
        ],
        rollbackOnError: true,
      }
    );
  };

  return {
    highlights: updateResponse?.highlights ?? [],
    insertHighlight,
    updateHighlightSelection,
    deleteHighlight,
  };
};

export default useUrHighlights;

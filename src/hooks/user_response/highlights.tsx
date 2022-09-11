import { PostgrestError, PostgrestSingleResponse } from "@supabase/supabase-js";
import { useCallback } from "react";
import { Highlight, HighlightOption, UserResponse } from "src/types/client";
import { partitionUserResponse } from "src/utils";
import useSWR, { SWRResponse, useSWRConfig } from "swr";
import supabase from "utils/supabase";

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
  const {
    data: userResponses,
  }: SWRResponse<UserResponse[] | null, PostgrestError | null> = useSWR(
    datasetID && "userResponses",
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
            response:response_option(id, label),
            comments,
            highlights:highlight(id, selection, highlightOption:highlight_option(id, label, color)),
            textSample:text_sample!inner(id, datsetID:dataset_id)
          `
        )
        .eq("text_sample.dataset_id", datasetID);

      if (error) throw error;

      return data;
    }
  );
  const { mutate } = useSWRConfig();

  const { matchingResponse, filteredResponses } = partitionUserResponse(
    userResponses,
    textSampleID
  );

  const insertHighlight = useCallback(
    (selection: string, highlightOption: HighlightOption) => {
      if (matchingResponse === undefined) return;
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
                user_response_id: matchingResponse.id,
              })
              .single();

          if (error) throw error;

          return [
            ...filteredResponses,
            {
              ...matchingResponse,
              highlights: [
                ...(matchingResponse.highlights ?? []),
                { ...newHighlight, selection: res.selection },
              ],
            },
          ];
        },
        {
          optimisticData: [
            ...filteredResponses,
            {
              ...matchingResponse,
              highlights: [
                ...(matchingResponse.highlights ?? []),
                newHighlight,
              ],
            },
          ],
          rollbackOnError: true,
        }
      );
    },
    [userResponses]
  );

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

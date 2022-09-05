import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { HighlightOption } from "src/types/client";
import { Highlight } from "src/types/db";
import { useSWRConfig } from "swr";
import supabase from "utils/supabase";
import useUserResponse from "./user_response";

const useUrHighlights = (datasetID: string | undefined, userResponseID: string) => {
  const { userResponses } = useUserResponse(datasetID);

  const updateResponse = userResponses?.find(
    (response) => response.id === userResponseID
  );

  const { mutate } = useSWRConfig();
  const insertHighlight = (
    selection: string,
    highlightOption: HighlightOption
  ) => {
    const filteredResponses =
      userResponses?.filter((response) => response.id !== userResponseID) ?? [];

    const updateResponse = userResponses?.find(
      (response) => response.id === userResponseID
    );

    if (!updateResponse) return;

    const updateHighlight = { id: "", selection, highlightOption };

    mutate(
      async () => {
        const { data: res, error }: PostgrestSingleResponse<Highlight> =
          await supabase
            .from("highlight")
            .insert({
              selection,
              highlight_option: highlightOption.id,
              user_response_id: userResponseID,
            })
            .single();

        if (error) throw error;

        return [
          ...filteredResponses,
          {
            ...updateResponse,
            highlights: [
              ...updateResponse.highlights,
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
            highlights: [...updateResponse.highlights, updateHighlight],
          },
        ],
        rollbackOnError: true,
      }
    );
  };

  const updateHighlight = (
    highlightID: string,
    selection: string,
    highlightOption: HighlightOption
  ) => {
    const filteredResponses =
      userResponses?.filter((response) => response.id !== userResponseID) ?? [];

    const updateResponse = userResponses?.find(
      (response) => response.id === userResponseID
    );

    if (!updateResponse) return;

    const filteredHighlights =
      updateResponse.highlights.filter(
        (highlight) => highlight.id !== highlightID
      ) ?? [];

    const updateHighlight = updateResponse.highlights.find(
      (highlight) => highlight.id === highlightID
    );

    mutate(
      async () => {
        const { data: res, error }: PostgrestSingleResponse<Highlight> =
          await supabase
            .from("highlight")
            .update({
              selection,
              highlight_option: highlightOption.id,
              user_response_id: userResponseID,
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
            highlights: [...filteredHighlights, updateHighlight],
          },
        ],
        rollbackOnError: true,
      }
    );
  };

  const deleteHighlight = (highlightID: string) => {
    const filteredResponses =
      userResponses?.filter((response) => response.id !== userResponseID) ?? [];

    const updateResponse = userResponses?.find(
      (response) => response.id === userResponseID
    );

    if (!updateResponse) return;

    const filteredHighlights =
      updateResponse.highlights.filter(
        (highlight) => highlight.id !== highlightID
      ) ?? [];

    mutate(
      async () => {
        const { error } = await supabase
          .from("highlight")
          .delete()
          .eq("id", highlightID)
          .single();

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
    highlights: updateResponse.highlights ?? [],
    insertHighlight,
    updateHighlight,
    deleteHighlight,
  };
};
export default useUrHighlights;

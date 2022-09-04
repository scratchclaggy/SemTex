import { PostgrestError, PostgrestSingleResponse } from "@supabase/supabase-js";
import { Dataset, HighlightOption, UserResponse } from "src/types";
import useSWR from "swr";
import supabase from "utils/supabase";

type SingleDataSet = Omit<Dataset, "name" | "created">;
type DbUserReponse = {
  id: string;
  response: string;
  comments: string;
  user_id: string;
  text_sample_id: string;
};

type DbHighlight = {
  id: string;
  highlight_option: string;
  user_response_id: string;
  selection: string;
};

export const useDataset = (
  datasetID: string
): {
  dataset: SingleDataSet | undefined | null;
  isLoading: boolean;
  datasetError: PostgrestError | null;
} => {
  const { data: dataset, error: datasetError } = useSWR("dataset", async () => {
    const {
      data,
      error,
    }: {
      data: SingleDataSet | null;
      error: PostgrestError | null;
    } = await supabase
      .from("dataset")
      .select(
        `
          id,
          textSamples:text_sample(id, body),
          highlightOptions:highlight_option(id, label, color),
          responseOptions:response_option(id, label),
          instructions
        `
      )
      .eq("id", datasetID)
      .single();

    if (error) throw error;

    return data;
  });

  return {
    dataset,
    isLoading: !dataset && !datasetError,
    datasetError: datasetError,
  };
};

export const useUserResponse = (
  datasetID: string
): {
  userResponses: UserResponse[] | undefined | null;
  userResponsesError: PostgrestError | null;
  updateComment: (userResponseID: string, newComment: string) => void;
  insertHighlight: (
    userResponseID: string,
    selection: string,
    highlightOption: HighlightOption
  ) => void;
  updateHighlight: (
    userResponseID: string,
    highlightID: string,
    selection: string,
    highlightOption: HighlightOption
  ) => void;
} => {
  const {
    data: userResponses,
    error: userResponsesError,
    mutate,
  } = useSWR("userResponses", async () => {
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
            response:response_option(id),
            comments,
            highlights:highlight(id, selection, highlightOption:highlight_option(id, label, color)),
            textSample:text_sample(id, datsetID:dataset_id)
          `
      )
      .eq("textSample.dataset_id", datasetID);

    if (error) throw error;

    return data;
  });

  const updateComment = (userResponseID: string, newComment: string) => {
    const filteredResponses =
      userResponses?.filter((response) => response.id !== userResponseID) ?? [];

    const updateResponse = userResponses?.find(
      (response) => response.id === userResponseID
    );

    if (!updateResponse) return;

    mutate(
      async () => {
        const { data: res, error }: PostgrestSingleResponse<DbUserReponse> =
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

  const insertHighlight = (
    userResponseID: string,
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
        const { data: res, error }: PostgrestSingleResponse<DbHighlight> =
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
    userResponseID: string,
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

    if (!updateHighlight) return;

    mutate(
      async () => {
        const { data: res, error }: PostgrestSingleResponse<DbHighlight> =
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

  return {
    userResponses,
    userResponsesError,
    updateComment,
    insertHighlight,
    updateHighlight,
  };
};

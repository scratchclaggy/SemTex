import { PostgrestError } from "@supabase/supabase-js";
import { partition } from "lodash";
import { Dataset, UserResponse } from "src/types";
import useSWR from "swr";
import supabase from "utils/supabase";

export const useDataset = (
  datasetID: string
): {
  dataset: Omit<Dataset, "name" | "created"> | null;
  isLoading: boolean;
  error: PostgrestError | null;
} => {
  const { data, error } = useSWR("dataset", async () => {
    const { data, error } = await supabase
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

    return { data: { dataset: data, pgError: error } };
  });

  if (!data) {
    return {
      dataset: null,
      isLoading: false,
      error: error,
    };
  }

  const { dataset, pgError } = data.data;

  return {
    dataset,
    isLoading: !dataset && !pgError,
    error: pgError,
  };
};

export const useUserResponse = (
  datasetID: string
): {
  userResponses: UserResponse[] | null;
  isLoading: boolean;
  error: PostgrestError | null;
  updateComment: (userResponseID: string, newComment: string) => void;
} => {
  const { data, error, mutate } = useSWR("userResponses", async () => {
    const {
      data: userResponses,
      error,
    }: { data: UserResponse[] | null; error: PostgrestError | null } =
      await supabase
        .from("user_response")
        .select(
          `
            id,
            responseOptions:response_option(id, label),
            comments,
            highlights:highlight(selection, highlight:highlight_option(id, label, color)),
            textSample:text_sample(id, datsetID:dataset_id)
          `
        )
        .eq("textSample.dataset_id", datasetID);

    userResponses ? console.log(userResponses) : console.log(error);

    return { data: { userResponses, pgError: error } };
  });

  const updateComment = (userResponseID: string, newComment: string) => {
    // Partition the response we're updating, and all other responses
    const [_newResponse, newResponses] = partition(
      userResponses,
      (response) => response.id === userResponseID
    );

    const newResponse = _newResponse.pop();
    if (!newResponse) return;

    newResponses.push({ ...newResponse, comments: newComment });

    const newData = {
      userResponses: newResponses,
      pgError,
    };

    mutate(
      (currentState) => {
        return new Promise(async (resolve, _) => {
          const {data: newItem} = await supabase.from('user_response').update({comments: newComment}).eq('id', userResponseID)
          console.log(newItem)
          resolve(currentState);
        });
      },
      { optimisticData: { data: newData }, rollbackOnError: true }
    );
  };

  if (!data)
    return { userResponses: null, isLoading: false, error, updateComment };

  const { userResponses, pgError } = data.data;

  return {
    userResponses,
    isLoading: !userResponses && !pgError,
    error: pgError,
    updateComment,
  };
};

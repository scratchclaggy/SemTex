import { PostgrestError } from "@supabase/supabase-js";
import { Dataset, UserResponse } from "src/types";
import useSWR from "swr";
import supabase from "utils/supabase";

export const useDataset = (
  datasetID: string
): {
  dataset: Omit<Dataset, "name" | "create"> | null;
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
          highlights:highlight_option(id, label, color),
          responses:response_option(id, label),
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
} => {
  const { data, error } = useSWR("userResponses", async () => {
    const { data, error } = await supabase
      .from("user_response")
      .select(
        `
          id,
          response,
          comments,
          highlights:highlight(
            label:highlight_option(label)
          ),
          textSampleID:text_sample_id
        `
      )

    return { data: { userResponses: data, pgError: error } };
  });

  if (!data) {
    return {
      userResponses: null,
      isLoading: false,
      error: error,
    };
  }

  const { userResponses, pgError } = data.data;

  return {
    userResponses,
    isLoading: !userResponses && !pgError,
    error: pgError,
  };
};

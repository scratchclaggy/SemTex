import { PostgrestError } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { Highlight, UserResponse } from "src/types/client";
import supabase from "src/utils/supabase";
import useSWR, { useSWRConfig } from "swr";

const useUserResponse = (userResponseID: string | undefined) => {
  const { data, error, mutate } = useSWR(
    userResponseID,
    async () => {
      const { data, error } = await supabase
        .from("user_response")
        .select(
          `
            id,
            response:response_option(id, label),
            comments,
            highlights:highlight(id, selection, startIndex:start_index, endIndex:end_index, highlightOption:highlight_option(id, label, color)),
            textSampleID:text_sample_id
          `
        )
        .eq("id", userResponseID)
        .single();

      if (error) throw error;

      return {
        ...data,
        highlights: data?.highlights.sort(
          (a: { startIndex: number }, b: { startIndex: number }) =>
            a.startIndex - b.startIndex
        ),
      };
    },
    { revalidateOnFocus: false }
  );

  const router = useRouter();
  const { mutate: genericMutate } = useSWRConfig();

  const insertHighlight = async (highlight: Omit<Highlight, "id">) => {
    await supabase.from("highlight").insert({
      selection: highlight.selection,
      start_index: highlight.startIndex,
      end_index: highlight.endIndex,
      highlight_option: highlight.highlightOption?.id,
      user_response_id: userResponseID,
    });

    const newUserResponse = {
      ...data,
      highlights: [...( data?.highlights ?? [] ), highlight].sort(
        (a, b) => a.startIndex - b.startIndex
      ),
    };

    mutate(() => newUserResponse, {
      optimisticData: newUserResponse,
      rollbackOnError: true,
    });
  };

  const deleteHighlight = async (highlightID: string) => {
    await supabase.from("highlight").delete().eq("id", highlightID).single();

    const newUserResponse = {
      ...data,
      highlights: data?.highlights.filter(
        (highlight: Highlight) => highlight.id !== highlightID
      ),
    };

    mutate(() => newUserResponse, {
      optimisticData: newUserResponse,
      rollbackOnError: true,
    });
  };

  const updateResponseOption = async (responseOptionID: string) => {
    await supabase
      .from("user_response")
      .update({
        response_option_id: responseOptionID,
      })
      .eq("id", data.id)
      .single();

    const newUserResponse = { ...data, responseOptionID };

    mutate(() => newUserResponse, {
      optimisticData: newUserResponse,
      rollbackOnError: true,
    });
    genericMutate(router.query.datasetID as string | undefined);
  };

  const updateComment = async (newComment: string) => {
    await supabase
      .from("user_response")
      .update({ comments: newComment })
      .eq("id", data.id)
      .single();

    const newUserResponse = { ...data, comments: newComment };

    mutate(() => newUserResponse, {
      optimisticData: newUserResponse,
      rollbackOnError: true,
    });
  };

  return {
    userResponse: data as UserResponse | undefined,
    userResponseError: error as PostgrestError | null,
    insertHighlight,
    deleteHighlight,
    updateResponseOption,
    updateComment,
  };
};

export default useUserResponse;

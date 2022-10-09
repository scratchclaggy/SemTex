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
  const refetchUserReponseList = () => {
    genericMutate(router.query.datasetID as string | undefined);
  };

  const setHighlights = async (
    userResponse: UserResponse | undefined,
    highlights: Omit<Highlight, "id">[] | undefined
  ) => {
    if (highlights === undefined) return;

    await supabase
      .from("highlight")
      .delete()
      .eq("user_response_id", userResponseID);

    await supabase.from("highlight").insert(
      highlights.map((highlight) => {
        return {
          selection: highlight.selection,
          start_index: highlight.startIndex,
          end_index: highlight.endIndex,
          highlight_option: highlight.highlightOption?.id,
          user_response_id: userResponseID,
        };
      })
    );

    const newUserResponse = {
      ...userResponse,
      highlights: [...(highlights ?? [])].sort(
        (a, b) => a.startIndex - b.startIndex
      ),
    };

    mutate(() => newUserResponse, {
      optimisticData: newUserResponse,
      rollbackOnError: true,
    });
    refetchUserReponseList();
  };

  const clearHighlights = async (userResponse: UserResponse | undefined) => {
    await supabase
      .from("highlight")
      .delete()
      .eq("user_response_id", userResponseID);

    const newUserResponse = {
      ...userResponse,
      highlights: [],
    };

    mutate(() => newUserResponse, {
      optimisticData: newUserResponse,
      rollbackOnError: true,
    });
    genericMutate(router.query.datasetID as string | undefined);
  };

  const updateResponseOption = async (
    userResponse: UserResponse | undefined,
    responseOptionID: string
  ) => {
    await supabase
      .from("user_response")
      .update({
        response_option_id: responseOptionID,
      })
      .eq("id", data?.id)
      .single();

    const newUserResponse = { ...userResponse, responseOptionID };

    mutate(() => newUserResponse, {
      optimisticData: newUserResponse,
      rollbackOnError: true,
    });
    refetchUserReponseList();
  };

  const updateComment = async (
    userResponse: UserResponse | undefined,
    newComment: string
  ) => {
    if (newComment === undefined) return;

    await supabase
      .from("user_response")
      .update({ comments: newComment })
      .eq("id", data?.id)
      .single();

    const newUserResponse = { ...userResponse, comments: newComment };

    mutate(() => newUserResponse, {
      optimisticData: newUserResponse,
      rollbackOnError: true,
    });
  };

  return {
    userResponse: data as UserResponse | undefined,
    userResponseError: error as PostgrestError | null,
    setHighlights,
    clearHighlights,
    updateResponseOption,
    updateComment,
  };
};

export default useUserResponse;

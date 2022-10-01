import { PostgrestError } from "@supabase/supabase-js";
import { Highlight } from "src/types/client";
import supabase from "src/utils/supabase";
import useSWR from "swr";

const useHighlights = (userResponseID: string | undefined) => {
  const { data, error, mutate } = useSWR(
    userResponseID,
    async () => {
      const { data, error } = await supabase
        .from("highlight")
        .select(
          `
            id,
            highlightOption:highlight_option(label, color),
            selection,
            startIndex:start_index,
            endIndex:end_index
          `
        )
        .eq("user_response_id", userResponseID)
        .order("start_index");

      if (error) throw error;

      return data;
    }
  );

  const insertHighlight = async (highlight: Omit<Highlight, "id">) => {
    await supabase
      .from("highlight")
      .insert({
        selection: highlight.selection,
        start_index: highlight.startIndex,
        end_index: highlight.endIndex,
        highlight_option: highlight.highlightOption?.id,
        user_response_id: userResponseID,
      })
      .single();

    const newHighlights = [...(data as Highlight[]), highlight].sort(
      (a, b) => a.startIndex - b.startIndex
    );

    mutate(
      () => {
        return newHighlights;
      },
      { optimisticData: newHighlights, rollbackOnError: true }
    );
  };

  const deleteHighlight = async (highlightID: string) => {
    await supabase.from("highlight").delete().eq("id", highlightID);

    mutate(() => [], { optimisticData: [], rollbackOnError: true });
  };

  return {
    highlights: data as Highlight[] | undefined,
    highlightsError: error as PostgrestError | null,
    insertHighlight,
    deleteHighlight,
  };
};

export default useHighlights;

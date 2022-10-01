import { PostgrestError } from "@supabase/supabase-js";
import { Highlight } from "src/types/client";
import supabase from "src/utils/supabase";
import useSWR from "swr";

const useHighlights = (userResponseID: string | undefined) => {
  const { data, error } = useSWR(userResponseID && "highlights", async () => {
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
  });

  return {
    highlights: data as Highlight[] | undefined,
    highlightsError: error as PostgrestError | null,
  };
};

export default useHighlights;

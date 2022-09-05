import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Highlight } from "src/types/db";
import { useSWRConfig } from "swr";
import supabase from "utils/supabase";
import useUserResponse from "./user_response";

const useUrResponseOption = (datasetID: string, userResponseID: string) => {
  const { userResponses } = useUserResponse(datasetID);

  const updateResponse = userResponses?.find(
    (response) => response.id === userResponseID
  );

  if (!updateResponse) return null;

  const { mutate } = useSWRConfig();

  const updateResponseOption = (responseOptionID: string) => {
    const filteredResponses =
      userResponses?.filter((response) => response.id !== userResponseID) ?? [];

    if (!updateResponse) return;

    mutate(
      "userResponses",
      async () => {
        const { data: res, error }: PostgrestSingleResponse<Highlight> =
          await supabase
            .from("user_response")
            .update({
              response_option_id: responseOptionID,
            })
            .eq("id", userResponseID)
            .single();

        if (error) throw error;

        return [
          ...filteredResponses,
          {
            ...updateResponse,
            responseOptionID: res.user_response_id,
          },
        ];
      },
      {
        optimisticData: [
          ...filteredResponses,
          {
            ...updateResponse,
            responseOptionID: responseOptionID,
          },
        ],
        rollbackOnError: true,
      }
    );
  };

  return {
    responseOptionID: updateResponse.responseOptionID,
    updateResponseOption,
  };
};
export default useUrResponseOption;

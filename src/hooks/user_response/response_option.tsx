import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useCallback } from "react";
import { ResponseOption } from "src/types/client";
import { UserResponse as DbUserResponse } from "src/types/db";
import { partitionUserResponse } from "src/utils";
import { useSWRConfig } from "swr";
import supabase from "utils/supabase";
import useUserResponse from "./user_response";

const useUrResponseOption = (
  datasetID: string | undefined,
  textSampleID: string | undefined
) => {
  const { userResponses } = useUserResponse(datasetID);
  const { mutate } = useSWRConfig();

  const { matchingResponse, filteredResponses } = partitionUserResponse(
    userResponses,
    textSampleID
  );

  const updateResponseOption = useCallback(
    (responseOption: ResponseOption | undefined) => {
      if (matchingResponse === undefined || responseOption === undefined) {
        return;
      }

      mutate(
        "userResponses",
        async () => {
          const { data: res, error }: PostgrestSingleResponse<DbUserResponse> =
            await supabase
              .from("user_response")
              .update({
                response_option_id: responseOption.id,
              })
              .eq("id", matchingResponse.id)
              .single();

          if (error) throw error;

          return [
            ...filteredResponses,
            {
              ...matchingResponse,
              response: {
                id: res.response_option_id,
                label: responseOption.label,
              },
            },
          ];
        },
        {
          optimisticData: [
            ...filteredResponses,
            {
              ...matchingResponse,
              response: {
                id: responseOption.id,
                label: responseOption.label,
              },
            },
          ],
          rollbackOnError: true,
        }
      );
    },
    [userResponses]
  );

  return {
    responseOption: matchingResponse?.response,
    updateResponseOption,
  };
};

export default useUrResponseOption;

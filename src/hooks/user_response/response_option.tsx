import { PostgrestSingleResponse } from "@supabase/supabase-js";
import {
  ResponseOption,
  UserResponse as ClientUserResponse,
} from "src/types/client";
import { UserResponse as DbUserResponse } from "src/types/db";
import { useSWRConfig } from "swr";
import supabase from "utils/supabase";
import useUserResponse from "./user_response";

const useUrResponseOption = (
  datasetID: string | undefined,
  textSampleID: string | undefined
) => {
  const { userResponses } = useUserResponse(datasetID);
  const { mutate } = useSWRConfig();

  const updateResponse = userResponses?.find(
    (response) => response.textSample.id === textSampleID
  );

  if (!updateResponse)
    return { responseOption: null, updateResponseOption: () => {} };
  console.log("UPDATE RESPONSE", updateResponse);

  const updateResponseOption = (responseOption: ResponseOption | undefined) => {
    if (!responseOption) return;

    mutate(
      "userResponses",
      async (userResponses: ClientUserResponse[]) => {
        const filteredResponses =
          userResponses?.filter(
            (response) => response.textSample.id !== textSampleID
          ) ?? [];

        const { data: res, error }: PostgrestSingleResponse<DbUserResponse> =
          await supabase
            .from("user_response")
            .update({
              response_option_id: responseOption.id,
            })
            .eq("id", updateResponse.id)
            .single();

        console.log("RES", res);

        if (error) throw error;

        return [
          ...filteredResponses,
          {
            ...updateResponse,
            response: {
              id: res.response_option_id,
              label: responseOption.label,
            },
          },
        ];
      },
      {
        revalidate: false,
      }
    );
  };

  return {
    responseOption: updateResponse.response,
    updateResponseOption,
  };
};

export default useUrResponseOption;

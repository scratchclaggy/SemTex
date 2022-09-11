import { ResponseOption } from "src/types/client";
import { partitionUserResponse } from "src/utils";
import supabase from "utils/supabase";
import useUserResponse from "./user_response";

const useUrResponseOption = (
  datasetID: string | undefined,
  textSampleID: string | undefined
) => {
  const { userResponses, mutate } = useUserResponse(datasetID);

  const { matchingResponse } = partitionUserResponse(
    userResponses,
    textSampleID
  );

  const updateResponseOption = async (
    responseOption: ResponseOption | undefined
  ) => {
    if (matchingResponse === undefined || responseOption === undefined) {
      return;
    }

    await supabase
      .from("user_response")
      .update({
        response_option_id: responseOption.id,
      })
      .eq("id", matchingResponse.id)
      .single();

    mutate();
  };

  return {
    responseOption: matchingResponse?.response,
    updateResponseOption,
  };
};

export default useUrResponseOption;

import { UserResponse } from "./types/client";

export const partitionUserResponse = (
  userResponses: UserResponse[] | null | undefined,
  textSampleID: string | undefined
) => {
  const matchingResponse = userResponses?.find(
    (response) => response.textSample?.id === textSampleID
  );

  const filteredResponses =
    userResponses?.filter(
      (response) => response.textSample?.id !== textSampleID
    ) ?? [];

  return { matchingResponse, filteredResponses };
};

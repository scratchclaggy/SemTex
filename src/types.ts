export type User = {
  id: string;
  password: string;
  email: string;
  type: string;
};

export type DatasetPermission = {
  id: string;
  userID: string;
  datasetID: string;
};

export type Dataset = {
  id: string;
  instructions: string;
  name: string;
  created: string;
  responses: ResponseOption[];
  highlightOptions: HighlightOption[]
};

export type ResponseOption = {
  id: string;
  label: string;
};

export type HighlightOption = {
  id: string;
  label: string;
  color: string;
};

export type TextSample = {
  id: string;
  body: string;
};

export type Highlight = {
  id: string;
  selection: string;
  highlightOption: Omit<HighlightOption, "id">;
};

export type UserResponse = {
  id: string;
  response: string;
  comments: string;
  highlights: Highlight[];
  textSample: Omit<TextSample, "body">;
};

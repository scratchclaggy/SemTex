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
  responseOptions: ResponseOption[];
  highlightOptions: HighlightOption[];
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
  highlightOption: HighlightOption;
};

export type UserResponse = {
  id: string;
  responseID: string;
  comments?: string;
  highlights: Highlight[];
  textSample: { id: string; datasetID: string };
};

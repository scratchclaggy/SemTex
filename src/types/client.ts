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
  textSamples: TextSample[];
  responseOptions: ResponseOption[];
  highlightOptions: HighlightOption[];
};

export type ListDataset = {
  id: string;
  name: string;
  created: Date;
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
  startIndex: number;
  endIndex: number;
  highlightOption: HighlightOption | undefined;
};

export type UserResponse = {
  id: string;
  response?: ResponseOption;
  comments?: string;
  highlights?: Highlight[];
  textSample: { id: string; datasetID: string };
};

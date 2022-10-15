export type UserResponse = {
  id: string;
  response_option_id: string;
  comments: string;
  user_id: string;
  text_sample_id: string;
};

export type Highlight = {
  id: string;
  highlight_option: string;
  user_response_id: string;
  selection: string;
};

export type Dataset = {
  name: string;
  passkey: string;
  instructions: string;
  text_samples: { body: string }[];
  highlight_options: { label: string; color: string }[];
  response_options: { label: string }[];
};

export type Submission = {
  name: String;
  instructions: String;
  passkey: String;
  text_samples: Object[];
  response_options: Object[];
  highlight_options: Object[];
};

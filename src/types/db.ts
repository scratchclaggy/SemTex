export type UserResponse = {
  id: string;
  response: string;
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

import { Dataset } from "src/types/client";
import supabase from "src/utils/supabase";

export const insertDataset = async (newDataset: Dataset) => {
  const dataset = await supabase.from("dataset").insert(newDataset);
  const dataset = await supabase.from("dataset").insert(newDataset);

  return response;
};

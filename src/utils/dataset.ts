import { Dataset } from "src/types/db";
import supabase from "src/utils/supabase";

export const insertDataset = async (newDataset: Dataset) => {
  const res = await supabase.rpc("add_dataset", {
    datasetobj: newDataset,
  });

  return res;
};

export const deleteDataset = async (datasetID: string) => {
  const res = await supabase.rpc("delete_dataset", {
    deleted_dataset_id: datasetID,
  });

  return res;
};

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/router";
import supabase from "src/utils/supabase";
import { selectedDatasetIDsAtom } from "./DatasetList";
import { deleteModalAtom } from "./DeleteConfirmationModal";

const ButtonConsole = () => {
  const setDeleteModalOpen = useSetAtom(deleteModalAtom);

  const selectedDatasetIDs = useAtomValue(selectedDatasetIDsAtom);

  const router = useRouter();

  const onDownload = () => {
    selectedDatasetIDs.forEach(async (datasetID) => {
      const { data, error } = await supabase.rpc("download_dataset", {
        downloaded_dataset_id: datasetID,
      });

      if (error) {
        return;
      }
      const json = JSON.stringify(data);
      const blob = new Blob([json], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${data?.at(0)?.dataset?.name}.json`;
      a.click();
    });
  };

  const onAdd = () => {
    router.push(`admin/new-dataset`);
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" onClick={onAdd}>
        <AddIcon />
        Add Data Set
      </Button>
      <Button
        variant="outlined"
        disabled={selectedDatasetIDs.length === 0}
        onClick={() => setDeleteModalOpen(true)}
      >
        <DeleteIcon />
        Delete Data Set
      </Button>
      <Button
        variant="outlined"
        disabled={selectedDatasetIDs.length === 0}
        onClick={onDownload}
      >
        <DownloadIcon /> Download Data Set
      </Button>
    </Stack>
  );
};
export default ButtonConsole;

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { deleteDatasets } from "src/utils/dataset";
import { useSWRConfig } from "swr";
import { selectedDatasetIDsAtom } from "./DatasetList";

const ButtonConsole = () => {
  const [selectedDatasetIDs, setSelectedDatasetIDs] = useAtom(
    selectedDatasetIDsAtom
  );
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const onDelete = () => {
    deleteDatasets(selectedDatasetIDs);
    mutate("datasetList");
    setSelectedDatasetIDs([]);
  };

  const onAdd = () => {
    router.push(`admin/new-dataset`);
  };
  return (
    <ButtonGroup size="large" aria-label="large button group" fullWidth>
      <Button onClick={onAdd}>
        <AddIcon />
        Add Data Set
      </Button>
      <Button onClick={onDelete}>
        <DeleteIcon />
        Delete Data Set
      </Button>
      <Button>
        <DownloadIcon /> Download Data Set
      </Button>
    </ButtonGroup>
  );
};
export default ButtonConsole;

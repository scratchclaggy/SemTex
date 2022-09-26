import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useAtomValue } from "jotai";
import { deleteDatasets } from "src/utils/dataset";
import { selectedDatasetIDsAtom } from "./DatasetList";

const ButtonConsole = () => {
  const selectedDatasetIDs = useAtomValue(selectedDatasetIDsAtom);

  const onDelete = () => {
    console.log(selectedDatasetIDs);
    deleteDatasets(selectedDatasetIDs);
  };
  return (
    <ButtonGroup size="large" aria-label="large button group" fullWidth>
      <Button>
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

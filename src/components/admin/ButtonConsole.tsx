import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useAtomValue } from "jotai";
import { deleteDatasets } from "src/utils/dataset";
import { selectedDatasetIDsAtom } from "./DatasetList";
import { useRouter } from 'next/router'

const ButtonConsole = () => {
const selectedDatasetIDs = useAtomValue(selectedDatasetIDsAtom); 
const router = useRouter();

  const onDelete = () => {
    console.log(selectedDatasetIDs);
    deleteDatasets(selectedDatasetIDs);
  };


  const onAdd=() => {  
    router.push(`admin/new-dataset`);

  }
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

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { atom, useAtom, useAtomValue } from "jotai";
import { deleteDatasets } from "src/utils/dataset";
import { mutate, useSWRConfig } from "swr";
import { selectedDatasetIDsAtom } from "./DatasetList";

export const deleteModalAtom = atom(false);



function AlertDialog() {
  const [isOpen, setIsOpen] = useAtom(deleteModalAtom);
  const [selectedDatasetIDs,setSelectedDatasetIDs] = useAtom(
    selectedDatasetIDsAtom
  );

  const { mutate } = useSWRConfig();

  const onDelete = () => {
    deleteDatasets(selectedDatasetIDs);
    mutate("datasetList"); 

    setSelectedDatasetIDs([]);
    setIsOpen(false);


  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog
        open={isOpen}

        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {" Are You Sure You want to delete the selected Data Sets?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleted Dastasets cannot be restored
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={onDelete} >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AlertDialog;

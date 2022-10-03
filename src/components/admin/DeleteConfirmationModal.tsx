import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { atom, useAtom } from "jotai";
import { deleteDatasets } from "src/utils/dataset";
import { useSWRConfig } from "swr";
import { selectedDatasetIDsAtom } from "./DatasetList";

export const deleteModalAtom = atom(false);

function AlertDialog() {
  const [isOpen, setIsOpen] = useAtom(deleteModalAtom);
  const [selectedDatasetIDs, setSelectedDatasetIDs] = useAtom(
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
        <DialogTitle id="alert-dialog-title">{" Are You Sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete these records? This process cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClose}
            startIcon={<CloseIcon />}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onDelete}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AlertDialog;

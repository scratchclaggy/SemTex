import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { atom, useAtom } from "jotai";
import useAuth from "src/contexts/AuthContext";
import  useDataset  from "src/hooks/dataset";

export const InstructionModalAtom = atom(false);

const InstructionModal = () => {
  const [isOpen, setIsOpen] = useAtom(InstructionModalAtom);
  const { user } = useAuth();
  const { dataset } = useDataset(user?.user_metadata.dataset);

  if (!dataset) {
    return null;
  }

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog
        style={{ overflow: "scroll" }}
        onClose={onClose}
        aria-labelledby="instruction-modal"
        open={isOpen}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Instructions
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box display="flex" justifyContent="center">
            <Typography>
              <pre style={{ fontFamily: "inherit", whiteSpace: "pre-wrap" }}>
                {dataset.instructions}
              </pre>
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstructionModal;

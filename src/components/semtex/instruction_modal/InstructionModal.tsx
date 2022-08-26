import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { atom, useAtom } from "jotai";

export const InstructionModalAtom = atom(false);

const text = `Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
consectetur ac, vestibulum at eros.

Also, multiline inputs work now...
`;

const InstructionModal = () => {
  const [isOpen, setIsOpen] = useAtom(InstructionModalAtom);

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
              <pre style={{ fontFamily: "inherit" }}>{text}</pre>
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstructionModal;

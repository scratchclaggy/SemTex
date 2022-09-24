import { HelpOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useAtom } from "jotai";
import { InstructionModalAtom } from "./InstructionModal";

const InstructionModalButton = () => {
  const [_, setIsOpen] = useAtom(InstructionModalAtom);

  return (
    <IconButton onClick={() => setIsOpen(true)}>
      <HelpOutline fontSize="large" />
    </IconButton>
  );
};

export default InstructionModalButton;

import HighlightSelector from "./HighlightSelector";
import InstructionInput from "./InstructionInput";
import NameInput from "./NameInput";
import ResponseCreator from "./ResponseCreator";
import UploadButton from "./UploadButton";
import { Stack } from "@mui/material";

const AdminCreate = () =>{
    return(
        <Stack
        alignItems="center"
        justifyContent="center"
        spacing={2}
        paddingTop={5}
        >
            <NameInput/>
            <InstructionInput/>
            <ResponseCreator/>
            <HighlightSelector/>
            <UploadButton/>
        </Stack>
    );
};
export default AdminCreate;
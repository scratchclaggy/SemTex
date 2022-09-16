import HighlightSelector from "./HighlightSelector";
import InstructionInput from "./InstructionInput";
import NameInput from "./NameInput";
import ResponseCreator from "./ResponseCreator";
import UploadButton from "./UploadButton";
import { Stack } from "@mui/material";

const AdminCreate = () =>{
    return(
        <Stack>
            <NameInput/>
            <InstructionInput/>
            <ResponseCreator/>
            <HighlightSelector/>
            <UploadButton/>
        </Stack>
    )
}
export default AdminCreate;
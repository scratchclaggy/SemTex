import { Stack } from "@mui/material";
import ButtonConsole from "./ButtonConsole";
import DatasetList from "./DatasetList";
import Search from "./Search";

const AdminHome = () =>{
    return(
        <Stack>
            <DatasetList />
            <ButtonConsole />
            <Search />
        </Stack>
    )
}
export default AdminHome;
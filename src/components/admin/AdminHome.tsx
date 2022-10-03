import { Stack } from "@mui/material";
import ButtonConsole from "./ButtonConsole";
import DatasetList from "./DatasetList";
import Search from "./Search";
import AlertDialog from "./DeleteConfirmationModal";
const AdminHome = () => {
  return (
    <Stack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      paddingTop={10}
    >
      <AlertDialog/>
      <Search />
      <ButtonConsole />
      <DatasetList />
      

    </Stack>
  );
};
export default AdminHome;

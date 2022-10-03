import { Stack } from "@mui/material";
import ButtonConsole from "./ButtonConsole";
import DatasetList from "./DatasetList";
import AlertDialog from "./DeleteModal";
import Search from "./Search";
const AdminHome = () => {
  return (
    <Stack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      paddingTop={10}
    >
      <AlertDialog />
      <Search />
      <ButtonConsole />
      <DatasetList />
    </Stack>
  );
};
export default AdminHome;

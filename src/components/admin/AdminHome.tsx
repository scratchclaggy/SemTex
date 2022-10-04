import { Stack } from "@mui/material";
import ButtonConsole from "./ButtonConsole";
import DatasetList from "./DatasetList";
import DeleteConfirmationDialog from "./DeleteConfirmationModal";
import Search from "./Search";
const AdminHome = () => {
  return (
    <Stack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      paddingTop={10}
    >
      <DeleteConfirmationDialog />
      <Search />
      <ButtonConsole />
      <DatasetList />
    </Stack>
  );
};
export default AdminHome;

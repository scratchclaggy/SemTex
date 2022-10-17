import { Stack } from "@mui/material";
import ButtonConsole from "./ButtonConsole";
import DatasetList from "./DatasetList";
import Search from "./Search";

const AdminHome = () => {
  return (
    <Stack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      paddingTop={10}
    >
      <Search />
      <ButtonConsole />
      <DatasetList />
    </Stack>
  );
};
export default AdminHome;

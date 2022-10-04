import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { useAtom } from "jotai";
import { filterAtom } from "./DatasetList";

const Search = () => {
  const [filter, setFilter] = useAtom(filterAtom);

  return (
    <TextField
      id="outlined-basic"
      label={<SearchIcon />}
      fullWidth
      value={filter}
      onChange={(e) => {
        setFilter(e.target.value);
      }}
    />
  );
};
export default Search;

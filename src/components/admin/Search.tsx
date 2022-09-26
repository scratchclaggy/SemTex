import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { atom, useAtom } from "jotai";
import DatasetList from "./DatasetList";


 // const requestSearch = (searchedVal: string) => {
 //   const filteredRows = originalRows.filter((row) => {
 //     return row.name.toLowerCase().includes(searchedVal.toLowerCase());
 //   });
 //   setRows(filteredRows);
 // };
//
 // const cancelSearch = () => {
//    setSearchTerm("");
//    requestSearch(searchTerm);
//  };



const Search = () => {
  

 return  <TextField id="outlined-basic" label=<SearchIcon/>   color="primary"/>

 
};
export default Search;

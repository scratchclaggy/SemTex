import { Alert, AlertTitle, Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useMemo } from "react";
import useDatasetList from "src/hooks/datasetList";

export const filterAtom = atom<string>("");
export const selectedDatasetIDsAtom = atom<string[]>([]);

const DatasetList = () => {
  const { datasetList, datasetListError } = useDatasetList();
  const filter = useAtomValue(filterAtom);
  const setSelected = useSetAtom(selectedDatasetIDsAtom);

  const rows: GridRowsProp | undefined = useMemo(
    () =>
      datasetList
        ?.filter((dataset) =>
          dataset.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((dataset) => {
          return {
            ...dataset,
            created: new Intl.DateTimeFormat(["ban", "id"]).format(
              dataset.created
            ),
          };
        }),
    [datasetList, filter]
  );

  // Flex property sets width of column via ratio i.e. 7:2
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 7 },
    {
      field: "created",
      headerName: "Created",
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
  ];

  return (
    <>
      {datasetListError && (
        <Alert severity="error">
          <AlertTitle>Error {datasetListError.code}</AlertTitle>
          <Typography>{datasetListError.message}</Typography>
          {datasetListError.details && (
            <Typography>Details: {datasetListError.details}</Typography>
          )}
          {datasetListError.hint && (
            <Typography>hint: {datasetListError.hint}</Typography>
          )}
        </Alert>
      )}
      {rows && (
        <Box height="80vh" width="90vw" bgcolor="#F5F5F0">
          <DataGrid
            columns={columns}
            rows={rows}
            checkboxSelection
            onSelectionModelChange={(newSelection) =>
              setSelected(newSelection as string[])
            }
          />
        </Box>
      )}
    </>
  );
};
export default DatasetList;

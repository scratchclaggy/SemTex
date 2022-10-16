import { Alert, AlertTitle, Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { atom, useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";
import { useMemo } from "react";
import useAuth from "src/contexts/AuthContext";
import useDatasetList from "src/hooks/datasetList";
import supabase from "src/utils/supabase";
import { useSWRConfig } from "swr";

export const filterAtom = atom<string>("");
export const selectedDatasetIDsAtom = atom<string[]>([]);

const DatasetList = () => {
  const { datasetList, datasetListError } = useDatasetList();
  const filter = useAtomValue(filterAtom);
  const setSelected = useSetAtom(selectedDatasetIDsAtom);
  const { user } = useAuth();
  const { mutate } = useSWRConfig();

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
    {
      field: "name",
      headerName: "Name",
      flex: 7,
      renderCell: ({ row }) => {
        return (
          <Link href={`/dataset/${row.id}`}>
            <a
              onClick={async () => {
                await supabase.rpc("check_dataset_passkey", {
                  userid: user?.id,
                  dataset_passkey: row.passkey,
                });
                mutate("dataset");
              }}
            >
              {row.name}
            </a>
          </Link>
        );
      },
    },
    { field: "passkey", headerName: "Passkey", flex: 2 },
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
        <Box height="80vh" width={"100%"} bgcolor="#F5F5F0">
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

import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import NotInterestedOutlinedIcon from "@mui/icons-material/NotInterestedOutlined";
import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { atom, useAtom } from "jotai";
import { useCSVReader } from "react-papaparse";

export const DatasetBodyAtom = atom<[string[]]>;
const CSVReader = () => {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader
      onUploadAccepted={(results: any) => {
        const res = results.data.map((row: any) => {
          return { id: row[0], body: row[1] };
        });
        DatasetBodyAtom(res); 

      }}
    >
      {({
        getRootProps,
        acceptedFile,
        getRemoveFileProps,
        ProgressBar,
      }: any) => (
        <Box>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={3}>
              <Button
                type="button"
                {...getRootProps()}
                variant="contained"
                startIcon={<FileUploadOutlinedIcon />}
              >
                Browse file
              </Button>
            </Grid>

            <div
              style={{
                border: "1px solid black",
                height: 45,
                lineHeight: 2.5,
                paddingLeft: 10,
                width: "80%",
              }}
            >
              {acceptedFile && acceptedFile.name}
            </div>

            <Grid item xs={24}>
              <Button
                {...getRemoveFileProps()}
                variant="contained"
                color="error"
                startIcon={<NotInterestedOutlinedIcon />}
              >
                Remove
              </Button>
            </Grid>
          </Grid>

          <ProgressBar style={{ background: "#1e81b0" }} />
        </Box>
      )}
    </CSVReader>
  );
};
export default CSVReader;
function useatom<T>(arg0: never[]) {
  throw new Error("Function not implemented.");
}


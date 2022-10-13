import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import NotInterestedOutlinedIcon from "@mui/icons-material/NotInterestedOutlined";
import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { useCSVReader } from "react-papaparse";

const CSVReader = () => {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader
      onUploadAccepted={(results: any) => {
        const array_items = results.data.map((row: any) => {
          return { id: row[0], body: row[1] };
        });
        console.log(array_items);
        //Pass value to contoller
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
            <ProgressBar style={{ background: "#1e81b0" }} /> //Progress bar
            prop that tells the user the file is uploaded
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
        </Box>
      )}
    </CSVReader>
  );
};
export default CSVReader;

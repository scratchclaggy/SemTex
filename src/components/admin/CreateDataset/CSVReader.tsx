import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import NotInterestedOutlinedIcon from "@mui/icons-material/NotInterestedOutlined";
import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { Controller, useFormContext } from "react-hook-form";
import { useCSVReader } from "react-papaparse";

const CSVReader = () => {
  const { CSVReader } = useCSVReader();
  const { control, setValue } = useFormContext();

  return (
    <Controller
      control={control}
      name="text_samples"
      rules={{ required: true }}
      render={({ field: { name } }) => {
        return (
          <CSVReader
            onUploadAccepted={(results: any) => {
              const res = results.data.map((row: any) => {
                return { id: row[0], body: row[1] };
              });
              setValue(name, res);
            }}
          >
            {({
              getRootProps,
              acceptedFile,
              getRemoveFileProps,
              ProgressBar,
            }: any) => (
              <Box width="600px">
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  <Grid item>
                    <Button
                      type="button"
                      {...getRootProps()}
                      variant="contained"
                      startIcon={<FileUploadOutlinedIcon />}
                    >
                      Browse file
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      {...getRemoveFileProps()}
                      variant="contained"
                      color="error"
                      startIcon={<NotInterestedOutlinedIcon />}
                    >
                      Remove
                    </Button>
                  </Grid>

                  <Grid item xs={6} justifyItems="center">
                    {acceptedFile && acceptedFile.name}
                  </Grid>
                </Grid>

                <Grid container paddingTop={1}>
                  <ProgressBar style={{ background: "#1e81b0" }} />
                </Grid>
              </Box>
            )}
          </CSVReader>
        );
      }}
    />
  );
};
export default CSVReader;

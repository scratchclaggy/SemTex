import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import NotInterestedOutlinedIcon from "@mui/icons-material/NotInterestedOutlined";
import { Box, Grid, Stack } from "@mui/material";
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
      render={({field: {name, value}}) => {
        return <CSVReader
          onUploadAccepted={(results: any) => {
            const res = results.data.map((row: any) => {
              return { id: row[0], body: row[1] };
            });
            setValue(name, res);
          } }
        >
          {({
            getRootProps, acceptedFile, getRemoveFileProps, ProgressBar,
          }: any) => (
            <Box>
              <Stack
                direction="row"
              >
                <Button
                  type="button"
                  {...getRootProps()}
                  variant="contained"
                  startIcon={<FileUploadOutlinedIcon />}
                >
                </Button>

                <Box
                  style={{
                    height: "30px",
                    lineHeight: 2.5,
                    paddingLeft: 10,
                    width: "100px",
                  }}
                >
                  {acceptedFile && acceptedFile.name}
                </Box>

                <Button
                  {...getRemoveFileProps()}
                  variant="contained"
                  color="error"
                  startIcon={<NotInterestedOutlinedIcon />}
                >
                </Button>
              </Stack>

              <ProgressBar style={{ background: "#1e81b0" }} />
            </Box>
          )}
        </CSVReader>;
      }}
      
    />
  );
};
export default CSVReader;

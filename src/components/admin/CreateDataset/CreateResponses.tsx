import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";

const CreateResponses = () => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray(
    {
      control,
      name: "response_options",
      rules: {required: true, }
    }
  );

  return (
    <Box>
      <Typography>Create Responses</Typography>
      <Grid>
        {fields.map((item, index) => {
          return (
            <Grid
              container
              item
              alignItems="center"
              key={item.id}
              spacing={2}
              sx={{
                paddingLeft: "50px",
                justifyContent: "center",
                justifyItems: "center",
              }}
            >
              <Grid item>
                <input
                  {...register(`response_options[${index}].label`, { required: true })}
                  placeholder="Set Response Option"
                  required
                />
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
        <Grid item>
          <IconButton
            onClick={() => {
              append({ label: "" });
            }}
          >
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateResponses;

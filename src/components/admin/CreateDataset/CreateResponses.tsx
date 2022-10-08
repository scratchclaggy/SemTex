import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Control, FieldValues, useFieldArray, useForm, useFormContext } from "react-hook-form";

const CreateResponses = () => {
  
  const { control, register } = useFormContext();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "responses",
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
              <input {...register(`responses[${index}].value`)} placeholder="Set Response Option" />
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
              append({ responseItem: fields.length.toString(), value: ""});
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

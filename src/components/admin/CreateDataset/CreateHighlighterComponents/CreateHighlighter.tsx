import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import ColorPicker from "./ColorPicker";

const CreateHighlighter = () => {
  const { control, register } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "test",
    }
  );

  return (
    <Box>
      <Typography>Create Highlighters</Typography>
      <Grid>
        {fields.map((item, index) => (
          <Grid
            container
            item
            key={item.id}
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <ColorPicker />
            </Grid>
            <Grid item>
              <input placeholder="Set Highlighter Label" />
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
        ))}
        <Grid item>
          <IconButton
            onClick={() => {
              append({ testing: fields.length.toString(), name: "" });
            }}
          >
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateHighlighter;

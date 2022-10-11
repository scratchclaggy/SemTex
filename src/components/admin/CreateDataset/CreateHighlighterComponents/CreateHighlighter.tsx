import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import ColorPicker from "./ColorPicker";

const CreateHighlighter = () => {

  const { control, register } = useFormContext();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "highlight_options",
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
              <ColorPicker index={index} />
            </Grid>
            <Grid item>
              <input {...register(`highlight_options[${index}].label`)} placeholder="Set Highlighter Label" />
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
              append({ highlighterItem: fields.length.toString(), label: "", hex: "" });
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

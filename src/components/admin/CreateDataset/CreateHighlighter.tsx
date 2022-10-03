import { Grid, IconButton, } from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { HuePicker } from 'react-color';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";

const CreateHighlighter = () => {
  const { control, register } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "test",
  });

  const [color, setColor] = useState("#ff0000")

  const handleColorChange = (color:string) => {
    setColor(color)
  }

  return (
    <Grid>
      {fields.map((item, index) => (
        <Grid container item key={item.id}>
          <Grid item>
            <HuePicker 
            color={color}
            onChangeComplete={(color) => handleColorChange(color.hex)}
            />
            <Controller
              render={({ field }) => <input {...field} />}
              name={`test.${index}.lastName`}
              control={control}
            />
          </Grid>
          <Grid item>
            <IconButton onClick={() => {
              remove(index);
              }}>
                  <DeleteIcon/>
                </ IconButton>
          </Grid>
        </Grid>
      ))}
      <Grid item>
        <IconButton onClick={() => {
              append({ testing: fields.length.toString(), name: '' });
            }}>
          <AddIcon/>
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default CreateHighlighter;

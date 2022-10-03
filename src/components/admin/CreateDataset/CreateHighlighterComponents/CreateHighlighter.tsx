import { Grid, IconButton, TextField, } from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import ColorPicker from "./ColorPicker";

const CreateHighlighter = () => {
  const { control, register } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "test",
  });

  return (
    <Grid>
      {fields.map((item, index) => (
        <Grid container item key={item.id} spacing={2}>
          <Grid item alignItems="center">
            <ColorPicker/>
          </Grid>
          <Grid item>
            <input/>
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

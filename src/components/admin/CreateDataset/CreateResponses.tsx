import { Box, Grid, IconButton, TextField, Typography, } from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";

const CreateResponses = () => {
  const { control, register } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "test",
  });

  return (
    <Box>
      <Typography>Create Responses</Typography>
      <Grid>
        {fields.map((item, index) => (
          <Grid 
          container 
          item 
          alignItems="center" 
          key={item.id} 
          spacing={2}
          sx={{
            paddingLeft: "50px",
            justifyContent: "center",
            justifyItems: "center"
          }}
          >
            <Grid item>
              <input
              placeholder="Set Response Option"
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
          
    </Box>
  );
}

export default CreateResponses;

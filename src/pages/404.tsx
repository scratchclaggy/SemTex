//404 page not found
import React from "react"
import Link from 'next/link'
import { Grid } from "@mui/material";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
 const FourOhFour=()=> {
    return (
    <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
  style={{ minHeight: '75vh' }}
>

  
<Grid item m={1}>
  <SentimentVeryDissatisfiedIcon fontSize="large" color="disabled" />
    </Grid>
    <Grid item m={1} >
      <h1>404 | Page Not Found  </h1>
      <Link href="/">

        <a>Go back home</a> 

         
        
      </Link>

    </Grid>   
   
   </Grid> 
  )}
  export default FourOhFour;

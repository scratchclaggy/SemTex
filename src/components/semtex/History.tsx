import { Box, Typography, Grid, IconButton } from "@mui/material";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { useState } from 'react';

const History = () => {

  const textSamples = [
    {
      body: "Sed a bibendum ex, nec venenatis magna. Nunc sagittis tincidunt dui, at posuere nisi. Etiam hendrerit nec dolor eu blandit. Maecenas turpis.",
      id: "852ca1e5-a345-4a09-956b-a53c8a1d4ec5",
    },
    {
      body: "Maecenas nec mauris sit amet mauris efficitur viverra. Phasellus sodales est est, a venenatis dui dignissim id. Sed ut lacus vitae pharetra.",
      id: "4c640cc9-f466-4377-9bec-f8ad6f622751",
    },
    {
      body: "Vivamus a facilisis dolor. In vel sem quis lectus pulvinar dapibus nec ut tortor. Suspendisse potenti. Sed iaculis laoreet mauris at tellus.",
      id: "fbfcdcb4-8cd8-4b49-bdf2-f51ef614f9e6",
    },
    {
      body: "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut commodo urna sed ultricies imperdiet.",
      id: "d1617456-7ebb-43ec-bf2b-9f87a3074f15",
    },
    {
      body: "Quisque tortor lectus, mollis vel felis a, elementum vestibulum eros. Nullam accumsan turpis at ipsum dapibus pellentesque. Integer tempor sapien vel ante molestie blandit. Aenean sed condimentum lectus.",
      id: "e34c400f-1553-4c07-8c25-6d9d27175e47",
    },
    {
      body: "Sed a bibendum ex, nec venenatis magna. Nunc sagittis tincidunt dui, at posuere nisi. Etiam hendrerit nec dolor eu blandit. Maecenas turpis.",
      id: "852ca1e5-a345-4a09-956b-a53c8a1d4ec5",
    },
    {
      body: "Maecenas nec mauris sit amet mauris efficitur viverra. Phasellus sodales est est, a venenatis dui dignissim id. Sed ut lacus vitae pharetra.",
      id: "4c640cc9-f466-4377-9bec-f8ad6f622751",
    },
    {
      body: "Vivamus a facilisis dolor. In vel sem quis lectus pulvinar dapibus nec ut tortor. Suspendisse potenti. Sed iaculis laoreet mauris at tellus.",
      id: "fbfcdcb4-8cd8-4b49-bdf2-f51ef614f9e6",
    },
    {
      body: "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut commodo urna sed ultricies imperdiet.",
      id: "d1617456-7ebb-43ec-bf2b-9f87a3074f15",
    },
    {
      body: "Quisque tortor lectus, mollis vel felis a, elementum vestibulum eros. Nullam accumsan turpis at ipsum dapibus pellentesque. Integer tempor sapien vel ante molestie blandit. Aenean sed condimentum lectus.",
      id: "e34c400f-1553-4c07-8c25-6d9d27175e47",
    },
  ]
  
  function handleClick()
  {
    console.log("Button pressed!")
  }

  const [clicked, setClicked] = useState(false);

  return (
  <Box
  sx={{
    margin: "10px",
    width: "250px",
    maxHeight: "80vh",
    border: 1,
    overflow: 'hidden',
    overflowY: 'scroll'
  }}
  >
    <div>
    {
      textSamples.map((val, i)=>
      (
        <Grid
        key={i}
        sx={{
          display:'flex',
        }}
        >
          <Typography
          onClick={handleClick}
          noWrap
          sx={{
            padding: "5px",
            borderBottom: 1,
            '&:hover':{
            borderRight: 1
            }
          }}
          >
          {val.body}
          </Typography>

          <IconButton onClick={() => setClicked(prevClick => !prevClick)}>
            {clicked?
              <AssignmentTurnedInIcon
              style={{
                paddingTop: '5px',
                color: 'green',
                alignItems: 'center'
              }}
              ></AssignmentTurnedInIcon>
              :
              <AssignmentLateIcon
              style={{
                paddingTop: '5px',
                color: 'red',
                alignItems: 'center'
              }}
              ></AssignmentLateIcon>
            }
          </IconButton>

        </Grid>
      ))
    }
    </div>
  </Box>
  )
};

export default History;

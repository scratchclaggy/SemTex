import { Box, Typography, Grid, IconButton } from "@mui/material";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { useState } from 'react';



const History_Card = (body: String) => {

  function handleClick() {
    console.log(console.log("Button Pressed"))
  }
  const [clicked, setClicked] = useState(false);

  return (
    <Box>
      {
        (
          <Grid
            sx={{
              display: 'flex',
            }}
          >
            <Typography
              onClick={handleClick}
              noWrap
              sx={{
                padding: "5px",
                borderBottom: 1,
                '&:hover': {
                  borderRight: 1
                }
              }}
            >
            </Typography>

            <IconButton onClick={() => setClicked(prevClick => !prevClick)}>
              {clicked ?
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
        )
      }
    </Box>
  );
};

export default History_Card;
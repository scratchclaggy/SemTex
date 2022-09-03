import * as React from 'react';
import LinearProgress, { LinearProgressProps } from  '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ProgressBar = () => {
  // TODO: Get user responses from DB
const completed= 28;
const count= 57
const percentage = completed / count * 100;
return <Box sx={{ display: 'flex', alignItems: 'center' }}>
  <Box sx={{ width: '100%', mr: 1 }}>
    <LinearProgress variant="determinate" value={percentage} />
  </Box>
  <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          percentage,
        )}%`}</Typography>
      </Box>
</Box>
}

export default ProgressBar
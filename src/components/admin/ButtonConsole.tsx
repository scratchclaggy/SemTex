import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';


const buttons = [
  <Button key="one"><AddIcon/>Add Data Set</Button>,
  <Button key="two"><DeleteIcon/>Delete Data Set</Button>,
  <Button key="three"><DownloadIcon/>Download Data Set </Button>,
];

const ButtonConsole = () => {

  return(
    <ButtonGroup size="large" aria-label="large button group">
  {buttons}
</ButtonGroup>
  )
};
export default ButtonConsole;

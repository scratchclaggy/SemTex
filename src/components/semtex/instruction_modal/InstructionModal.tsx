import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import HelpIcon from '@mui/icons-material/Help';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
const text= `Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
ullamcorper nulla non metus auctor fringilla.
ras mattis consectetur purus sit amet fermentum. Cras justo odio,
dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
ullamcorper nulla non metus auctor fringilla.
ras mattis consectetur purus sit amet fermentum. Cras justo odio,
dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
ullamcorper nulla non metus auctor fringilla.
ras mattis consectetur purus sit amet fermentum. Cras justo odio,
dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
ullamcorper nulla non metus auctor fringilla.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
ullamcorper nulla non metus auctor fringilla.
ras mattis consectetur purus sit amet fermentum. Cras justo odio,
dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
ullamcorper nulla non metus auctor fringilla.
ras mattis consectetur purus sit amet fermentum. Cras justo odio,
dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
ullamcorper nulla non metus auctor fringilla.end`
const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

      <HelpIcon onClick={handleClickOpen}/>
      
      <BootstrapDialog
       style={{ overflow: 'scroll' }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="md" 
        
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Instructions
        </BootstrapDialogTitle>
        <DialogContent dividers >
          
        {
            text.split("\n").map(
              (paragraph, i) => <Typography key={i} align='left' paragraph>{paragraph}</Typography> 
           )
        }
      
         

         
        </DialogContent>
        
      </BootstrapDialog>
    </div>
  );
}

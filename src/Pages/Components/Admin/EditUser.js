import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import InputField from '../InputField'
import '../../CSS/EditUser.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditUser({open, handleClose,username,password,email,role,sub}) {

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
      >
        <DialogTitle>{"Edit User Information"}</DialogTitle>
        <label className='edit--users--labels'>UserName:</label>
        <InputField value={username}/>
        <label className='edit--users--labels'>Email:</label>
        <InputField value={email}/>
        <label className='edit--users--labels'>Password:</label>
        <InputField value={password}/>
        <label className='edit--users--labels'>Role:</label>
        <InputField value={role}/>
        <label className='edit--users--labels'>Sub:</label>
        <InputField value={sub}/>
        <DialogActions>
          <Button onClick={handleClose} color='error'>Cancel</Button>
          <Button onClick={handleClose}>Edit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

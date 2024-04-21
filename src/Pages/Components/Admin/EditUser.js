import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import InputField from '../InputField';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditUser({ open, handleClose, userId, username, email, password, role, sub }) {
  const [updatedUserId, setUpdatedUserId] = useState('');
  const [updatedUsername, setUpdatedUsername] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedPassword, setUpdatedPassword] = useState('');
  const [updatedRole, setUpdatedRole] = useState('');
  const [updatedSub, setUpdatedSub] = useState('');

  useEffect(() => {
    setUpdatedUserId(userId);
    setUpdatedUsername(username);
    setUpdatedEmail(email);
    setUpdatedPassword(password);
    setUpdatedRole(role);
    setUpdatedSub(sub);
  }, [open, userId, username, email, password, role, sub]);

  const handleEditUser = () => {
    axios.put(`http://localhost:4000/users/updateUser/${updatedUserId}`, {
      username: updatedUsername,
      email: updatedEmail,
      password: updatedPassword,
      role: updatedRole,
      sub: updatedSub
    })
      .then(res => {
        console.log("User updated successfully");
        handleClose();
      })
      .catch(error => {
        console.error("Error updating user:", error);
        // Handle error
      });
  };

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
        <label className='edit--users--labels'>User ID:</label>
        <InputField value={updatedUserId} onChange={(e) => setUpdatedUserId(e.target.value)} />
        <label className='edit--users--labels'>UserName:</label>
        <InputField value={updatedUsername} onChange={(e) => setUpdatedUsername(e.target.value)} />
        <label className='edit--users--labels'>Email:</label>
        <InputField value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} />
        <label className='edit--users--labels'>Password:</label>
        <InputField value={updatedPassword} onChange={(e) => setUpdatedPassword(e.target.value)} />
        <label className='edit--users--labels'>Role:</label>
        <InputField value={updatedRole} onChange={(e) => setUpdatedRole(e.target.value)} />
        <label className='edit--users--labels'>Sub:</label>
        <InputField value={updatedSub} onChange={(e) => setUpdatedSub(e.target.value)} />
        <DialogActions>
          <Button onClick={handleClose} color='error'>Cancel</Button>
          <Button onClick={handleEditUser}>Edit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

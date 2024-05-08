
import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { AccountContext } from './Security/AccountContext';
import { Grid } from '@mui/material';
import styled from 'styled-components';


const Root = styled(Grid)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: '600px',
  backgroundColor: '#f5f5f5',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 3px 5px 2px rgba(63, 81, 181, .3)',
  zIndex: 10,
}));


const ImageContainer = styled(Grid)({
  width: '10vw',
  height: '20vh',
  borderRadius: '70%',
  backgroundColor: '#ddd',
  marginBottom: '20px',
  overflow: 'hidden',
});

const ImageInput = styled('input')({
  display: 'none',
});

const SaveButton = styled(Button)({
  marginTop: '20px',
  backgroundColor: '#3f51b5',
  color: 'white',
  boxShadow: '0 3px 5px 2px rgba(63, 81, 181, .3)',
  '&:hover': {
    backgroundColor: '#303f9f',
  },
  padding: '10px 20px',
  fontSize: '1.2em',
  transition: 'all 0.3s ease',
});

function ProfileComponent({ onClose }) {
  const {currentUser,setCurrentUser} = useContext(AccountContext); 
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setCurrentUser((prevUserData) => ({ ...prevUserData, image: imageFile }));
    uploadImage(imageFile);
  };

  const uploadImage = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      const response = await axios.post(`/users/upload/${currentUser.email}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded successfully:', response.data);
      setCurrentUser((prevUserData) => ({ ...prevUserData, image_url: response.data.image_url }));
      console.log("after upload" ,currentUser.image_url)
      console.log(currentUser)
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSave = async () => {
    try {
      const body = {
        username: currentUser.username,
        email: currentUser.email,
        role: currentUser.role,
        sub: currentUser.sub,
        image_url: currentUser.image_url,
      };
      if (currentUser.newPassword) {
        body.password = currentUser.newPassword;
      }
      console.log("body", body);
      const response = await axios.put(`http://localhost:4003/users/updateUser/${currentUser.email}`, body);
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  
  return (
    <Root container>
      <IconButton onClick={onClose} sx={{ position: 'absolute', top: '5px', right: '5px', zIndex: 1 }}>
        <CloseIcon />
      </IconButton>
  
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Profile
        </Typography>
      </Grid>
  
      <ImageContainer item xs={5} ml={20}>
          {currentUser.image ? (
            <img src={"http://localhost:4003/uploads"+currentUser.image_url} alt="Profile" style={{ width: '100%', height: '100%' }} />
          ) : (
            <Typography variant="body1" textAlign="center" style={{ lineHeight: '100px' }}>Upload Image</Typography>
          )}
        </ImageContainer>

        <ImageInput type="file" accept="image/*" onChange={handleImageChange} id="image-input" />
        <Grid item xs={12} m={4} ml={28}>
          <label htmlFor="image-input">
            <Button variant="outlined" component="span">
              Choose Image
            </Button>
          </label>
        </Grid>
  
      <Grid item xs={12}>
        <TextField name="username" label="Username" value={currentUser.username} onChange={handleInputChange} fullWidth margin="normal" />
      </Grid>
      <Grid item xs={12}>
        <TextField name="email" label="Email" value={currentUser.email} onChange={handleInputChange} fullWidth margin="normal" />
      </Grid>
      <Grid item xs={12}>
  <TextField
    name="newPassword"
    label="New Password"
    type={showPassword ? 'text' : 'password'}
    onChange={handleInputChange}
    fullWidth
    margin="normal"
    InputProps={{
      endAdornment: (
        <IconButton onClick={togglePasswordVisibility} size="small">
          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      ),
    }}
  />
</Grid>
      <Grid item xs={12}>
        <SaveButton variant="contained" onClick={handleSave}>
          Save
        </SaveButton>
      </Grid>
    </Root>
  );
}

export default ProfileComponent;


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
      const response = await axios.post(`http://localhost:4003/users/upload/${currentUser.email}`, formData, {
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
      const formData = new FormData();
      formData.append('username', currentUser.username);
      formData.append('email', currentUser.email);
      formData.append('password', currentUser.password);
      formData.append('image', currentUser.image_url);
  //http://localhost:4000/users/updateUser/aimannn@gmail.com
  const body={
    username:currentUser.username,
    email:currentUser.email,
    password:currentUser.password,
    role:currentUser.role,
    sub:currentUser.sub,
    image_url: currentUser.image_url,
  }
  console.log("after button click   " ,currentUser.image_url)
  console.log("body",body)
      const response = await axios.put(`http://localhost:4003/users/updateUser/${currentUser.email}`,body );
      console.log("response",response)
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 'calc(50% - 300px)',
        bottom: 'calc(50% - 300px)',
        right: '20px',
        width: 'calc(100% - 40px)',
        maxWidth: '1400px',
        maxHeight: '600px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        zIndex:10
      }}
    >
      <IconButton onClick={onClose} sx={{ position: 'absolute', top: '5px', right: '5px', zIndex: 1 }}>
        <CloseIcon />
      </IconButton>

      <Typography variant="h6" gutterBottom>
        Profile
      </Typography>

      <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'lightgray', marginBottom: '20px' }}>
        {currentUser.image ? (
          <img src={"http://localhost:4003/uploads"+currentUser.image_url} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
        ) : (
          <Typography variant="body1" textAlign="center" style={{ lineHeight: '100px' }}>Upload Image</Typography>
        )}
      </div>

      <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} id="image-input" />
      <label htmlFor="image-input">
        <Button variant="outlined" component="span">
          Choose Image
        </Button>
      </label>

      <TextField name="username" label="Username" value={currentUser.username} onChange={handleInputChange} fullWidth margin="normal" />
      <TextField name="email" label="Email" value={currentUser.email} onChange={handleInputChange} fullWidth margin="normal" />
      <TextField
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={currentUser.password}
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
      <Button variant="contained" onClick={handleSave} sx={{ marginTop: '20px' }}>
        Save
      </Button>
    </Box>
  );
}

export default ProfileComponent;


import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

function ProfileComponent({ onClose, userId }) {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    image: null,
  });

  useEffect(() => {
    if (userId) {
      getUserById(userId);
    }
  }, [userId]);

  const getUserById = async (userId) => {
    try {
      console.log('Fetching user data for userId:', userId);
      const response = await axios.get(`/getUserById/${userId}`);
      console.log('Response data:', response.data);
      const { username, email, password, image } = response.data;
      setUserData((prevUserData) => ({ ...prevUserData, username, email, password, image }));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setUserData((prevUserData) => ({ ...prevUserData, image: imageFile }));
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('username', userData.username);
      formData.append('email', userData.email);
      formData.append('password', userData.password);
      formData.append('image', userData.image); 

      await axios.put(`/updateUser/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
      }}
    >
      <IconButton onClick={onClose} sx={{ position: 'absolute', top: '5px', right: '5px', zIndex: 1 }}>
        <CloseIcon />
      </IconButton>

      <Typography variant="h6" gutterBottom>
        Profile
      </Typography>

      {/* Profile Circle */}
      <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'lightgray', marginBottom: '20px' }}>
        {/* Display uploaded image if available */}
        {userData.image ? (
          <img src={URL.createObjectURL(userData.image)} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
        ) : (
          <Typography variant="body1" textAlign="center" style={{ lineHeight: '100px' }}>Upload Image</Typography>
        )}
      </div>

      {/* File Input for Image */}
      <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} id="image-input" />
      <label htmlFor="image-input">
        <Button variant="outlined" component="span">
          Choose Image
        </Button>
      </label>

      <TextField name="username" label="Username" value={userData.username} onChange={handleInputChange} fullWidth margin="normal" />

      <TextField name="email" label="Email" value={userData.email} onChange={handleInputChange} fullWidth margin="normal" />

      <TextField
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={userData.password}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <IconButton onClick={togglePasswordVisibility} size="small">
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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

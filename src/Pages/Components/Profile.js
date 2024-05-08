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
import UserContext from './UserContext';

function ProfileComponent({ onClose }) {
  const userId = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    image: null,
    sub: '',
    role: ''
  });

  useEffect(() => {
    getUserByEmail();
  }, []);

  const getUserByEmail = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/users/getUserByEmail/${userId.email}`);
      const { username, email, password, role, sub } = response.data;
      setUserData({ username, email, password, role, sub });
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

      const response = await axios.put(`http://localhost:4000/users/updateUser/${userId.email}`, formData);
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '500px',
        p: 4,
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      <IconButton onClick={onClose} sx={{ position: 'absolute', top: '8px', right: '8px', color: '#666' }}>
        <CloseIcon />
      </IconButton>

      <Typography variant="h5" align="center" gutterBottom>
        Profile
      </Typography>

      <Box
        sx={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          backgroundColor: '#e3f2fd',
          margin: '0 auto 20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {userData.image ? (
          <img src={URL.createObjectURL(userData.image)} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
        ) : (
          <Typography variant="body1" textAlign="center" style={{ lineHeight: '100px' }}>Upload Image</Typography>
        )}
      </Box>

      <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} id="image-input" />
      <label htmlFor="image-input">
        <Button variant="outlined" component="span" fullWidth sx={{ mb: 2 }}>
          Choose Image
        </Button>
      </label>

      <TextField
        name="username"
        label="Username"
        value={userData.username}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="email"
        label="Email"
        value={userData.email}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
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
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          ),
        }}
      />
      <Button variant="contained" onClick={handleSave} fullWidth>
        Save
      </Button>
    </Box>
  );
}

export default ProfileComponent;

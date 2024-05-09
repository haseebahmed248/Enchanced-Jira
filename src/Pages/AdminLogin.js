import React, { useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from './Components/Security/AccountContext';
import { Button, TextField, Typography, Box, Container, Link, Paper } from '@mui/material';
import AdminIcon from '@mui/icons-material/AdminPanelSettings';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  background: 'linear-gradient(45deg, #454545 30%, #505050 90%)',
  padding: theme.spacing(2),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f1',
  boxShadow: '0px 20px 8px rgba( 0, 0, 0, 0.15)',
}));

const StyledAdminIcon = styled(AdminIcon)(({ theme }) => ({
  fontSize: '2.5rem',
  marginBottom: theme.spacing(2),
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: '35%',
  height: 40,
  borderRadius:15,
  fontWeight:'bold',
  fontSize: '1.3rem',
  dropShadow: '0px 24px 4px rgba(0, 0, 0, 0.25)'
}));

function AdminLogin() {
  const { user, setUser } = useContext(AccountContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        username: username,
        password: password,
      };
      await axios.post('http://localhost:4002/admin/adminLogin', loginData);
      setUser({ loggedIn: true, username: username });
      navigate('/admin/Dashboard');
    } catch (error) {
      console.error('Error Login up:', error);
      user.loggedIn = false;
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid Credentials');
      } else {
        setErrorMessage('An error occurred during Login');
      }
    }
  };

  return (
    <StyledContainer maxWidth="100%">
      <StyledPaper elevation={4} sx={{
        width: '30%',
        padding: '4%',
      }}>
        <StyledAdminIcon />
        <Typography component="h1" variant="h5">
          Admin Login
        </Typography>
        <StyledForm noValidate onSubmit={handleSubmit}>
          <TextField variant="outlined" margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus value={username} onChange={(e) => setUsername(e.target.value)} />
          <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errorMessage && <Typography variant="body2" color="error">{errorMessage}</Typography>}
          <StyledButton type="submit"  variant="contained">
            Login
          </StyledButton>
          <Box mt={2} >
            <Link component={RouterLink} to="/signUp" variant="body2" sx={{ fontSize: '1.3rem' }}>
              User Login
            </Link>
          </Box>
        </StyledForm>
      </StyledPaper>
    </StyledContainer>
  );
}

export default AdminLogin;
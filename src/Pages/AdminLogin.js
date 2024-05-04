import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from './Components/Security/AccountContext';
import { Button, TextField, Typography, Box } from '@mui/material';
import styled from 'styled-components';
import AdminIcon from '@mui/icons-material/AdminPanelSettings';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40vh;
  width:25vw;
  padding:40px;
  background-color: #f5f5f1;
`;

const StyledAdminIcon = styled(AdminIcon)`
  font-size: 2.5rem;
  color: #3f51b5;
`;

const Form = styled.form`
  width: 100%;
  margin-top: 1rem;
`;

const SubmitButton = styled(Button)`
  margin-top: 2rem;
`;

function AdminLogin() {
  const {user,setUser} = useContext(AccountContext);
  const Navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        username: username,
        password: password
      };
      await axios.post('http://localhost:4002/admin/adminLogin', loginData);
      setUser({loggedIn: true, username: username});
      Navigate('/admin/Dashboard')
    } catch (error) {
      console.error("Error Login up:", error);
      user.loggedIn = false;
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalide Credentails");
      } else {
        setErrorMessage("An error occurred during Login");
      }
    }
  };

  return (
    <Container>
      <StyledAdminIcon />
      <Typography component="h1" variant="h5">
        Admin Login
      </Typography>
      <Form noValidate onSubmit={handleSubmit}>
        <TextField variant="outlined" margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errorMessage && <Typography variant="body2" color="error">{errorMessage}</Typography>}
        <SubmitButton type="submit" fullWidth variant="contained" color="primary">
          Login
        </SubmitButton>
        <Box mt={2}>
          <Link to='/signUp'>User Login</Link>
        </Box>
      </Form>
    </Container>
  );
}

export default AdminLogin;
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoogleApi from './Components/GoogleApi';
import UserContext from './Components/UserContext';
import { Button, TextField, Container, Typography, Box, Grid } from '@mui/material';
import styled from 'styled-components';
import { AccountContext } from './Components/Security/AccountContext';


const FullHeightGrid = styled(Grid)`
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 255, 0.7), rgba(0, 0, 255, 0.1)), url('https://i.ibb.co/j6t2MxR/bg.jpg');
  background-size: cover;
  background-position: center;
  justify-content: center;
  align-items: center;  
`;

const ImageContainer = styled(Grid)`
  height: 80vh; 
  width: 100%; 
  background-image: url('https://media.istockphoto.com/id/1970368433/photo/3d-icon-render-illustration-of-clipboard-checklist-with-magnifying-and-dashboard-and-business.webp?s=2048x2048&w=is&k=20&c=R7YrGPEY_eZwN7n3IQq-yLI3q7Heg60ItePlttIoMU0=');
  background-size: cover;
  background-position: center;
`;


const SmallContainer = styled(Container)`
  max-width: 100%;
  height: 50vh;
`;

const StyledButton = (props) => (
  <Button 
    {...props}
    sx={{
      backgroundColor: '#4169E1',
      padding:1,
      width:'35%',
      marginTop:4,
      borderRadius:5,
      fontSize:20,
      boxShadow: '10px 10px 15px rgba(0, 0, 10, 0.3)',
      color:'white',
      '&:hover': {
        backgroundColor: '#7894EA',
      },
    }}
  />
);

const CircleImage = styled('img')`
  border-radius: 50%;
  width: 150px; 
  height: 150px;
`;


function SignUp() {
  const navigate = useNavigate();
  const {currentUser,setCurrentUser} = useContext(AccountContext);
  const { user, setUser } = useContext(AccountContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleGoogleSuccess = async ({ username, email, sub }) => {
    setUsername(username);
    setEmail(email);
    handleGoogleSignUp({ username, email, sub });
  };

  const handleGoogleSignUp = async ({ username, email, sub }) => {
    try {
      const signupData = {
        username: username,
        email: email,
        role: "User",
        sub: sub
      };

      const response = await axios.post(
        "http://localhost:4003/users/insertUserSub",
        signupData
      );

      if (response.status === 200) {
        setCurrentUser({email: response.data.email});
        console.log("email",response.data.email)
        console.log("api data: ",response)
        setUser({loggedIn: true});
        navigate("/organizations");
      } else {
        setErrorMessage("An error occurred during SignUp");
      }
    } catch (e) {
      console.log("Signup Api error", e);
      setErrorMessage("An error occurred during SignUp");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signupData = {
        username: username,
        email: email,
        password: password,
        role: "User"
      };
      console.log(signupData)
      const response = await axios.post('http://localhost:4003/users/insertUser', signupData);
      console.log("Signup successful!", response);
      

      
      
      if (response.status === 200) {
        navigate('/');
      } else {
        setErrorMessage("An error occurred during sign-up");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage("Email already exists");
      } else {
        setErrorMessage("An error occurred during sign-up");
      }
    }
  };
  
  return (
      <FullHeightGrid container>
      
        <Grid container item xs={12} sm={10} justifyContent="center" alignItems="center" sx={{
          backgroundColor: 'white',
          width:'80%',
          height: '80vh',
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.3)',
          borderRadius: 4 
        }} >
          <Grid item xs={12} sm={7} >
            <ImageContainer  sx={{
              borderTopRightRadius:'1.8%',
              borderBottomRightRadius:'1.8%',
              }}/>
          </Grid>
          
          <Grid item xs={12} sm={5} sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width:'100%'
        }}>
        <CircleImage src="https://i.ibb.co/wwCSJ0k/Dark-White-Letter-FD-Logo-3.png" alt="Introduction Image" sx={{
          border:'1px solid black'
        }}/>
          <SmallContainer component="main" sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component="h1" variant="h2" sx={{
            textAlign:'center',
             width: '100%',
             color:'#4169E1',
             }}>
            Sign-Up
          </Typography>
            <form noValidate onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
              <TextField variant="outlined" margin="normal" required fullWidth id="username" label="User Name" name="username" autoComplete="username"  value={username} onChange={(e) => setUsername(e.target.value)} />
              <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email"  value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {errorMessage && <Typography variant="body2" color="error">{errorMessage}</Typography>}
              <GoogleApi handleGoogleSuccess={handleGoogleSuccess} style={{marginTop: "10px"}}/>
              <StyledButton type="submit" >
                Sign-Up
              </StyledButton>
              <Box sx={{ mt: 2 }}>
                <Link to='/' sx={{ textDecoration: 'none', color: 'inherit' }}>Already have an account? Login</Link>
              </Box>
            </form>
          </Box>
          </SmallContainer>
          </Grid>
        </Grid>
      </FullHeightGrid>
  );
}

export default SignUp;
import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import InputField from './Components/InputField'
import {useState, useContext} from 'react'
import axios from 'axios'
import GoogleApi from './Components/GoogleApi';

import UserContext from './Components/UserContext'
import { AccountContext } from './Components/Security/AccountContext'

function Login() {
  const userId = useContext(UserContext)
  const user = useContext(AccountContext);
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [userID, setUserId] = useState(null);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleGoogleSuccess = async ({ username, email, sub }) => {
    setEmail(email);
    console.log(sub)
    try {
      const response = await axios.post('http://localhost:4000/users/checkLoginSub', { sub });
      console.log(sub);
      if (response.status === 200) {
        setUserId(response.data.userId); // Store user ID
        navigate('/organizations');
      } else {
        setErrorMessage("An error occurred during Login");
      }
    } catch (e) {
      console.log("Login Api error");
      setErrorMessage("An error occurred during Login");
      console.log(e)
    }
  };

  const handleGoogleSubmit = async ({ sub }) => {
    try {
      const response = await axios.post('http://localhost:4000/users/checkLoginSub', { sub });
      console.log(sub);
      if (response.status === 200) {
        user.loggedIn = true;
        navigate('/organizations');
      } else {
        setErrorMessage("An error occurred during Login");
      }
    } catch (e) {
      console.log("Login Api error");
      setErrorMessage("An error occurred during Login");
      console.log(e)
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        email: email,
        password: password
      };
      const response = await axios.post('http://localhost:4000/users/checkLogin', loginData);
      console.log("Login successful!");
      userId.email = response.data[0].email
      console.log(response)
      if (response.status === 200) {
        user.loggedIn = true;
        navigate('/organizations');
      } else {
        setErrorMessage("An error occurred during Login");
      }

    } catch (error) {
      console.error("Error Logging in:", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage("Wrong credentials");
      } else {
        setErrorMessage("An error occurred during Login");
      }
    }
  };

  return (
    <div className='container'>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
        <InputField type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputField type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errorMessage && <p className="error-message" 
        style={{ color: "red" }}>
        {errorMessage}
        </p>}

        <GoogleApi handleGoogleSuccess={handleGoogleSuccess}/>
        <p>Click here to <Link to='/signUp'>Sign-Up</Link></p>
        <button type="submit" className="signUp-BTN">Login</button>
      </form>
    </div>
  )
}

export default Login
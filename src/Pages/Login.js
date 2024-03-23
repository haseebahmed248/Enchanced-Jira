// Login.js
import React from 'react'
import {Link} from 'react-router-dom'
import InputField from './Components/InputField'
import {useState} from 'react'
import axios from 'axios'

function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        email: email,
        password: password
      };
      await axios.post('http://localhost:4000/checkLogin', loginData);
      console.log("Login successful!");
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
        
        <h4>Continue with google</h4>
        <p>Click here to <Link to='/signUp'>Sign-Up</Link></p>
        <button type="submit" className="signUp-BTN">Login</button>
      </form>
    </div>
  )
}

export default Login

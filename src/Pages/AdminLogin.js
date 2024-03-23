// AdminLogin.js
import React from 'react'
import InputField from './Components/InputField'
import {Link} from 'react-router-dom'
import {useState} from 'react';
import axios from 'axios';

function AdminLogin() {
  
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
      await axios.post('http://localhost:4000/adminLogin', loginData);
      console.log("Login successful!");
    } catch (error) {
      console.error("Error Login up:", error);
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalide Credentails");
      } else {
        setErrorMessage("An error occurred during Login");
      }
    }
  };

  return (
    <div className='container'>
    <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
      <InputField type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
      
      
      <InputField type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {errorMessage && <p className="error-message" 
        style={{ color: "red" }}>
        {errorMessage}
        </p>}
      <p>Click here to <Link to='/signUp'>User-Login</Link></p>
      <button className="signUp-BTN">Login</button>
      </form>
    </div>
  )
}

export default AdminLogin

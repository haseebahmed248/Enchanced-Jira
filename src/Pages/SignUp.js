import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from './Components/InputField';
import axios from 'axios';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signupData = {
        username: username,
        email: email,
        password: password
      };
      const status = await axios.post('http://localhost:4000/insertUser', signupData);
      console.log("Signup successful!");
    } catch (error) {
      console.error("Error signing up:", error);
      
    }
  };

  return (
    <div className='container'>
      <h1>Sign-Up</h1>
      <form onSubmit={handleSubmit}>
        <InputField type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <InputField type="text" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputField type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <h4>Continue with google</h4>
        <p>Click here to <Link to='/'>Login</Link></p>
        <button type="submit" className="signUp-BTN">Sign-Up</button>
      </form>
    </div>
  );
}

export default SignUp;

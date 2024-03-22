// Login.js
import React from 'react'
import {Link} from 'react-router-dom'
import InputField from './Components/InputField'

function Login() {
  return (
    <div className='container'>
    <h1>Login</h1>
      <InputField type="text" placeholder="Enter your username" />
      
      
      <InputField type="password" placeholder="Enter your password" />
      
      <h4>Continue with google</h4>
      
      <p>Click here to <Link to='/signUp'>Register</Link></p>
      <button className="signUp-BTN">Login</button>
    </div>
  )
}

export default Login

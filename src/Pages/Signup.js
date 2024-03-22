// Signup.js
import React from 'react'
import InputField from './Components/InputField'

function Signup() {
  return (
    <div className='container'>
    <h1>Login</h1>
      <InputField type="text" placeholder="Enter your username" />
      
      
      <InputField type="password" placeholder="Enter your password" />
      
      <h4>Continue with google</h4>

      <p>Click here to <span>Register</span></p>
      <button className="signUp-BTN">SignUp</button>
    </div>
  )
}

export default Signup

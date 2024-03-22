import React from 'react'
import {Link} from 'react-router-dom';
import InputField from './Components/InputField'

function SignUp() {
  return (
    <div className='container'>
    <h1>Sign-Up</h1>
      <InputField type="text" placeholder="Enter your username" />
      
      <InputField type="text" placeholder="Enter your Email" />
      
      <InputField type="password" placeholder="Enter your password" />
      
      <h4>Continue with google</h4>
      
      <p>Click here to <Link to='/'>Login</Link></p>
      <button className="signUp-BTN">Sign-Up</button>
    </div>
  )
}

export default SignUp
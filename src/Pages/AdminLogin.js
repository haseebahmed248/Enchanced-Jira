// AdminLogin.js
import React from 'react'
import InputField from './Components/InputField'

function AdminLogin() {
  return (
    <div className='container'>
    <h1>Admin Login</h1>
      <InputField type="text" placeholder="Enter your username" />
      
      
      <InputField type="password" placeholder="Enter your password" />
      
      <p>Click here to <span>User-Login</span></p>
      <button className="signUp-BTN">Login</button>
    </div>
  )
}

export default AdminLogin

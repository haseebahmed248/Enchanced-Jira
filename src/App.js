import React from 'react';
import './App.css';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import AdminLogin from './Pages/AdminLogin';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Organizations from './Pages/Organizations';
import Home from './Pages/Main/Home';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path='/admin' element={<AdminLogin />} />  
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/organizations/Home" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import AdminLogin from './Pages/AdminLogin';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Organizations from './Pages/Organizations';
import Home from './Pages/Main/Home';
import AdminDashboard from './Pages/Main/AdminDashboard';
import { UserProvider } from './Pages/Components/UserContext';
import PrivateRoutes from './Pages/Components/Security/PrivateRoutes';
import UserContextProvider from './Pages/Components/Security/AccountContext'; // Import UserContextProvider

export const OrganizationIdContext = React.createContext();
export const MessageContext = React.createContext();
function App() {
  const  [messages,setMessages] = useState([]);
  const [orgID,setOrgID] = useState([]);
  return (
    <BrowserRouter>
      <UserContextProvider>
            <UserProvider>
            <MessageContext.Provider value={{messages,setMessages,orgID,setOrgID}}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path='/admin' element={<AdminLogin />} />  
            <Route element={<PrivateRoutes />}>
            
              <Route path="/organizations" element={<Organizations />} />
              <Route path="/organizations/Home" element={<Home />} />
              <Route path="/admin/Dashboard" element={<AdminDashboard />} />
            </Route>
            <Route path="*" element={<Login />} />  
          </Routes>
        </div>
        </MessageContext.Provider>
        </UserProvider>
      </UserContextProvider>
    </BrowserRouter>
    
  );
}

export default App;

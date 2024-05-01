import { useContext } from 'react';
import { AccountContext } from './AccountContext';

const {Outlet,Navigate} = require('react-router-dom')
const useAuth = () => {
    const {user} = useContext(AccountContext);
    console.log("from auth", user)
    return user && user.loggedIn;
}

const PrivateRoutes = ()=>{
    const isAuth = useAuth();
    return isAuth ? 
    <Outlet />
     : <Navigate to="/"/>
}

export default PrivateRoutes;
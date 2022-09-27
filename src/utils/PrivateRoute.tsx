import React, { useContext } from 'react';
import { UserContext } from '../contexts/user';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }:{children:React.ReactNode|React.ReactElement})=> {
    const { user } = useContext(UserContext);
    return <>{user ? children : <Navigate to="/" />}</>;
}
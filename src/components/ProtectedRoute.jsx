import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ProtectedRoute = ({children}) => {
    const isAuth = useSelector((state) => state.auth.isAuth);
    const loading = useSelector((state) => state.auth.loading);

    // console.log('Is Authenticated:', isAuth);
    if (loading) return <div>Loading...</div>;

  return isAuth ? children : <Navigate to='/' />;
};

export default ProtectedRoute
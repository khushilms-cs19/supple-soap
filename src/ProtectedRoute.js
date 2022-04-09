import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute(props) {
    const isAuthenticated = useSelector((state) => state.userData.isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to={"/"} />
    }
    return props.children;
}

export default ProtectedRoute;
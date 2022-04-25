import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function AdminProtectedRoute(props) {
    const isAuthenticated = localStorage.getItem("admin");
    if (!isAuthenticated) {
        return <Navigate to={"/admin/login"} />
    }
    return props.children;
}

export default AdminProtectedRoute;
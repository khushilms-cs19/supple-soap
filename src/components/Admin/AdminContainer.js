import React from 'react'
import Admin from './Admin';
import AdminLogin from './AdminLogin';

function AdminContainer() {
    const adminToken = localStorage.getItem("admin");
    return (
        <div>
            {
                adminToken ?
                    <Admin />
                    :
                    <AdminLogin />
            }
        </div>
    )
}

export default AdminContainer;
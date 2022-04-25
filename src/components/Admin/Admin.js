import React, { useState } from 'react'
import CustomerMessages from './CustomerMessages';
import OrdersAdmin from './OrdersAdmin';

function Admin() {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <div className='admin-page-container'>
            <h1>Admin Dashboard</h1>
            <div className='admin-page-tab-select'>
                <button className={`${activeTab === 0 && "tab-active"}`} onClick={() => setActiveTab(0)}>Orders</button>
                <button className={`${activeTab === 1 && "tab-active"}`} onClick={() => setActiveTab(1)}>Customer Messages</button>
                <button className={`${activeTab === 2 && "tab-active"}`} onClick={() => setActiveTab(2)}>Products</button>
                <button className={`${activeTab === 3 && "tab-active"}`} onClick={() => setActiveTab(3)}>Customize</button>
            </div>
            <div className='admin-page-content'>
                {
                    activeTab === 0 &&
                    <OrdersAdmin />
                }
                {
                    activeTab === 1 &&
                    <CustomerMessages />
                }
                {
                    activeTab === 2 &&
                    <p>Coming soon</p>
                }
                {
                    activeTab === 3 &&
                    <p>Coming soon</p>
                }
            </div>
        </div>
    )
}

export default Admin;
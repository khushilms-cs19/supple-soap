import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import user from "../../images/user.png";
import Orders from './Orders';
import ProfileDetails from './ProfileDetails';
function Profile(props) {
    const userData = useSelector((state) => state.userData);
    const [activeTab, setActiveTab] = useState("profile");
    console.log(props);
    const selectProfile = () => {
        setActiveTab("profile");
    }
    const selectOrders = () => {
        setActiveTab("orders");
    }
    return (
        <div className='user-profile-container'>
            <div className='user-profile-top'>
                <img src={user} alt="user" />
                <p>{userData.name}</p>
            </div>
            <div className='user-profile-tab-selector'>
                <button className={`${activeTab === "profile" ? "tab-active" : ""}`} onClick={selectProfile}>Profile</button>
                <button className={`${activeTab === "orders" ? "tab-active" : ""}`} onClick={selectOrders}>Orders</button>
            </div>
            <div className='user-profile-tab-active'>
                {
                    activeTab === "profile" &&
                    <ProfileDetails showMessage={props.showMessage} />
                }
                {
                    activeTab === "orders" &&
                    <Orders />
                }
            </div>
        </div>
    )
}

export default Profile;
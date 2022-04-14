import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

function ProfileDetails() {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const addressRef = useRef(null);
    const phonenoRef = useRef(null);
    const userData = useSelector((state) => state.userData);
    const updateUserProfile = () => {
        console.log({
            name: nameRef.current.value,
            email: emailRef.current.value,
            address: addressRef.current.value,
            phoneno: phonenoRef.current.value,
        });
    }
    return (
        <div className='profile-tab'>
            <label htmlFor='name'>Name</label>
            <input type={"text"} name="name" ref={nameRef} placeholder="Enter your name" defaultValue={userData.name} />
            <label htmlFor='email'>Email</label>
            <input type={"email"} name="email" ref={emailRef} placeholder="Enter your email" defaultValue={userData.email} />
            <label htmlFor='address'>Address</label>
            <textarea type={"text"} name="address" ref={addressRef} placeholder="Enter your address" defaultValue={userData.address} />
            <label htmlFor='phoneno'>Phone Number</label>
            <input type={"number"} name="phoneno" minLength={10} maxLength={10} ref={phonenoRef} placeholder="Enter your phone number" defaultValue={userData.phoneno} />
            <button onClick={updateUserProfile}>Update</button>
        </div>
    )
}

export default ProfileDetails;
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { userConstants } from '../../redux/actions/userActions';

function SignupModal(props) {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const addressRef = useRef(null);
    const phonenoRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmpasswordRef = useRef(null);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const setclearError = (error) => {
        setError(error);
        setTimeout(() => {
            setError("");
        }, 3000);
    }
    const openLoginModal = () => {
        props.closeModal();
        props.openLoginModal();
    }
    const clickHandler = async (event) => {
        event.preventDefault();
        if (passwordRef.current.value !== confirmpasswordRef.current.value) {
            setclearError("passwords dont match");
            return false;
        }
        const signupData = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            address: addressRef.current.value,
            phoneno: phonenoRef.current.value,
            password: passwordRef.current.value,
        };
        if (nameRef.current.value && emailRef.current.value && addressRef.current.value && phonenoRef.current.value && passwordRef.current.value) {

            axios({
                baseURL: "http://localhost:5000/user/signup",
                method: "POST",
                data: signupData,
            }).then((data) => {
                console.log(data.data);
                dispatch({
                    type: userConstants.USER_UPDATE_ALL_DATA,
                    payload: {
                        ...data.data,
                        isAuthenticated: true,
                    }
                });
                localStorage.setItem("user", data.data.token);
                props.closeModal();
            }).catch((error) => {
                if (error.response.status === 409) {
                    setclearError("User already exists");
                }
            })
            console.log({
                name: nameRef.current.value,
                email: emailRef.current.value,
                address: addressRef.current.value,
                phoneno: phonenoRef.current.value,
                password: passwordRef.current.value,
            });
        } else {
            setclearError("Enter all the fields");
        }
    }
    return (
        <div className='signup-container'>
            <div className='signup-title'>
                <h2>Sign Up</h2>
                <div onClick={() => props.closeModal()}>
                    <p className='modal-cross-button'>&#x292B;</p>
                </div>
            </div>
            <form className='signup-form' onSubmit={clickHandler}>
                <label htmlFor='name'>Name</label>
                <input type={"text"} name="name" ref={nameRef} />
                <label htmlFor='email'>Email</label>
                <input type={"email"} name="email" ref={emailRef} />
                <label htmlFor='address'>Address</label>
                <textarea type={"text"} name="address" ref={addressRef} />
                <label htmlFor='phoneno'>Phone Number</label>
                <input type={"number"} name="phoneno" minLength={10} maxLength={10} ref={phonenoRef} />
                <label htmlFor='password'>Password</label>
                <input type={"password"} name="password" ref={passwordRef} minLength={10} />
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input type={"password"} name="confirmPassword" ref={confirmpasswordRef} />
                <div>
                    {
                        error &&
                        <p className='signup-error'>*{error}</p>
                    }
                </div>
                <div onClick={openLoginModal} style={{ margin: "10px 0px" }}>
                    <p>Already have an account? <span style={{ textDecoration: "underline", cursor: "pointer" }}>Click here!</span></p>
                </div>
                <div className='signup-button-container'>
                    <button className='navbar-buttons-signin' type='submit'>Sign up</button>
                </div>
            </form>
        </div>
    )
}

export default SignupModal;
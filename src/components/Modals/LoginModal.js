import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userConstants } from '../../redux/actions/userActions';

function LoginModal(props) {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const setclearError = (error) => {
        setError(error);
        setTimeout(() => {
            setError("");
        }, 3000);
    }
    const openSignupModal = () => {
        props.closeModal();
        props.openSignupModal();
    }
    const clickHandler = (event) => {
        event.preventDefault();
        if (emailRef.current.value && passwordRef.current.value) {
            const loginData = {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            };
            axios({
                baseURL: "http://localhost:5000/user/login",
                method: "POST",
                data: loginData,
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
                if (error.response.status === 401) {
                    setclearError("email or passoword is incorrect");
                }
            })
        } else {
            setclearError("Please enter all the values");

        }
    }
    return (
        <div className='signup-container'>
            <div className='signup-title'>
                <h2>Login</h2>
                <div onClick={() => props.closeModal()}>
                    <p className='modal-cross-button'>&#x292B;</p>
                </div>
            </div>
            <form className='signup-form' onSubmit={clickHandler}>
                <label htmlFor='email'>Email</label>
                <input type={"email"} name="email" ref={emailRef} />
                <label htmlFor='password'>Password</label>
                <input type={"password"} name="password" ref={passwordRef} />
                <div>
                    {
                        error &&
                        <p className='signup-error'>*{error}</p>
                    }
                </div>
                <div onClick={openSignupModal} style={{ margin: "10px 0px" }}>
                    <p>Don't have an account <span style={{ textDecoration: "underline", cursor: "pointer" }}>Click here to Sign up!</span></p>
                </div>
                <div className='signup-button-container'>
                    <button className='navbar-buttons-signin' type='submit'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginModal;
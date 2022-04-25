import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const setclearError = (error) => {
        setError(error);
        setTimeout(() => {
            setError("");
        }, 3000);
    }
    const loginHandler = (event) => {
        event.preventDefault();
        const loginCreds = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        if (emailRef.current.value && passwordRef.current.value) {
            axios({
                baseURL: "http://localhost:5000/admin/login",
                data: loginCreds,
                method: "POST",
            }).then((data) => {
                localStorage.setItem("admin", data.data.token);
                navigate("/admin/dashboard");
            }).catch((err) => {
                if (err.response.status === 401) {
                    setclearError("email or passoword is incorrect");
                } else {
                    setclearError(err);
                }
            });
        } else {
            setclearError("Enter valid input");
        }
    }
    return (
        <div className='admin-login-container'>
            <form className='admin-login-card'>
                <input placeholder='Enter your email' type="email" ref={emailRef} />
                <input placeholder='Enter your password' type="password" ref={passwordRef} />
                <button onClick={loginHandler}>Login</button>
                {
                    error &&
                    <p className='signup-error'>*{error}</p>
                }
            </form>
        </div>
    )
}

export default AdminLogin;
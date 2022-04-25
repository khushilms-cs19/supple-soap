import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import soaps from "../../../images/soaponhand.png";
import axios from "axios";
// import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const ContactUs = React.forwardRef((props, ref) => {
    const nameRef = useRef("");
    const emailRef = useRef("");
    const subjectRef = useRef("");
    const descriptionRef = useRef("");
    // const userData = useSelector((state) => state.userData);
    const handleSubmit = async (e) => {
        e.preventDefault();
        axios({
            baseURL: "http://localhost:5000/contactus",
            method: "POST",
            data: {
                name: nameRef.current.value,
                email: emailRef.current.value,
                subject: subjectRef.current.value,
                description: descriptionRef.current.value,
            },
            headers: {
                "Authentication": localStorage.getItem("user"),
            }
        }).then((data) => {
            props.showMessage(data.data.message);
        }).catch((err) => {
            props.showMessage(err.message);
        })
    }
    return (
        <div className='contactus-container' ref={ref}>
            <div className='contactus-left'>
                <form className='contactus-form'>
                    <h1>Contact Us</h1>
                    <input type="text" placeholder='Name' name="name" ref={nameRef} />
                    <input type="email" placeholder='Email' name="email" ref={emailRef} />
                    <input type="text" placeholder='Subject' name="subject" ref={subjectRef} />
                    <textarea placeholder='Type your message here...' ref={descriptionRef} />
                    <button onClick={handleSubmit}>
                        Submit
                        <img src="https://img.icons8.com/ios-filled/50/ffffff/forward--v1.png" style={{ width: "20px" }} />
                    </button>
                </form>
            </div>
            <div className='contactus-right'>
                <img src={soaps} alt="soaps" />
            </div>
        </div>
    )
})

export default ContactUs;
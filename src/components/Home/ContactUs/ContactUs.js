import React from 'react'
import soaps from "../../../images/soaponhand.png";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

function ContactUs() {
    return (
        <div className='contactus-container'>
            <div className='contactus-left'>
                <form className='contactus-form'>
                    <h1>Contact Us</h1>
                    <input type="text" placeholder='Name' name="name" />
                    <input type="email" placeholder='Email' name="email" />
                    <input type="text" placeholder='Subject' name="subject" />
                    <textarea placeholder='Type your message here...' />
                    <button>
                        Submit
                        <ArrowForwardIosRoundedIcon color="white" fontSize='small' />
                    </button>
                </form>
            </div>
            <div className='contactus-right'>
                <img src={soaps} alt="soaps" />
            </div>
        </div>
    )
}

export default ContactUs;
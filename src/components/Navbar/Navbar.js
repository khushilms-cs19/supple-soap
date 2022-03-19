import React from 'react'
import logo from "../../images/logo.png";
import user from "../../images/user.png";
function Navbar() {
    return (
        <nav className='navbar-container'>
            <img src={logo} alt="logo" className='navbar-img' />
            <ul className='navbar-pages'>
                <li>Home</li>
                <li>Shop</li>
                <li>Customize</li>
                <li>About</li>
                <li>Contact Us</li>
            </ul>
            <div className='navbar-buttons'>
                <button className='navbar-buttons-signin'>Sign in</button>
                <button className='navbar-buttons-login'>Log in</button>
                <div className='user-img-container'>
                    <img src={user} alt="user" className='user-img' />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
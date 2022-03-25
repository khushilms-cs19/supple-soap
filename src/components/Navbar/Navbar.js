import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from "../../images/logo.png";
import user from "../../images/user.png";
function Navbar(props) {
    const [currentMove, setCurrentMove] = useState("up");
    const [prevScrollY, setPrevScrollY] = useState(window.scrollY);

    useEffect(() => {
        const onScroll = () => {
            if (prevScrollY >= window.scrollY) {
                setCurrentMove("up");
            } else {
                setCurrentMove("down");
            }
            setPrevScrollY(window.scrollY);
        }
        // window.removeEventListener("scroll", onScroll);
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, [prevScrollY]);
    // const direction = prevScrollY >= window.scrollY ? "up" : "down";
    return (
        <nav className='navbar-container' style={{ top: currentMove === "down" ? "-90px" : "0" }} >
            <img src={logo} alt="logo" className='navbar-img' />
            <ul className='navbar-pages'>
                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <li onClick={() => window.scroll({ top: 0, left: 0, behavior: "smooth" })}>Home</li>
                </Link>
                <Link to={"/products"} style={{ textDecoration: "none" }}>
                    <li>Shop</li>
                </Link>
                <Link to={"/customize"} style={{ textDecoration: "none" }}>
                    <li>Customize</li>
                </Link>
                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <li onClick={props.scrollToAbout}>About</li>
                </Link>
                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <li onClick={props.scrollToContact}>Contact Us</li>
                </Link>

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
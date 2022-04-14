import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logonew from "../../images/logonew.svg";
import user from "../../images/user.png";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { userConstants } from '../../redux/actions/userActions';
import CartDetails from './CartDetails';
function Navbar(props) {
    const [currentMove, setCurrentMove] = useState("up");
    const [prevScrollY, setPrevScrollY] = useState(window.scrollY);
    const userData = useSelector((data) => data.userData);
    // const [showCart, setShowCart] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const logoutUser = () => {
        localStorage.clear();
        dispatch({
            type: userConstants.USER_CLEAR_DATA,
        })
        navigate("/");
    }
    const closeCartModal = () => {
        props.setShowCart(false);
    }
    useEffect(() => {
        const onScroll = () => {
            if (prevScrollY >= window.scrollY) {
                setCurrentMove("up");
            } else {
                setCurrentMove("down");
            }
            setPrevScrollY(window.scrollY);
        }
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, [prevScrollY]);
    return (
        <nav className='navbar-container' style={{ top: currentMove === "down" ? "-90px" : "0" }} >
            <img src={logonew} alt="logo" className='navbar-img' />
            <ul className='navbar-pages'>
                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <li onClick={() => window.scroll({ top: 0, left: 0, behavior: "smooth" })}>Home</li>
                </Link>
                <Link to={"/products"} style={{ textDecoration: "none" }}>
                    <li>Shop</li>
                </Link>
                {
                    userData.isAuthenticated ?
                        <Link to={"/customize"} style={{ textDecoration: "none" }}>
                            <li>Customize</li>
                        </Link>
                        :
                        <li onClick={props.openSignupModal}>Customize</li>
                }
                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <li onClick={props.scrollToAbout}>About</li>
                </Link>
                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <li onClick={props.scrollToContact}>Contact Us</li>
                </Link>

            </ul>
            <div className='navbar-buttons'>
                {
                    userData.isAuthenticated ?
                        <React.Fragment>
                            <button className='navbar-buttons-login' onClick={logoutUser}>Logout</button>
                            <div className='navbar-buttons-cart-container' >
                                {/* <ShoppingCartIcon fontSize='large' color="#554e45" onClick={() => props.setShowCart((prevState) => {
                                    if (location.pathname !== "/user/checkout")
                                        return !prevState;
                                    else
                                        return prevState;
                                })} /> */}
                                <img src="https://img.icons8.com/material-two-tone/24/000000/shopping-cart-loaded.png" onClick={() => props.setShowCart((prevState) => {
                                    if (location.pathname !== "/user/checkout")
                                        return !prevState;
                                    else
                                        return prevState;
                                })} />
                                <p className='navbar-buttons-cart-size'>{userData.cart.regularProducts.length + userData.cart.customizedProducts.length}</p>
                                {
                                    props.showCart && location.pathname !== "/user/checkout" &&
                                    < CartDetails closeCartModal={closeCartModal} mainPage={false} />
                                }
                            </div>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <button className='navbar-buttons-signin' onClick={props.openSignupModal}>Sign up</button>
                            <button onClick={props.openLoginModal} className='navbar-buttons-login'>Log in</button>
                        </React.Fragment>
                }
                {
                    userData.isAuthenticated ?
                        <Link to="/user/profile">
                            <div className='user-img-container'>
                                <img src={user} alt="user" className='user-img' />
                            </div>
                        </Link>
                        :
                        <div className='user-img-container' onClick={props.openSignupModal}>
                            <img src={user} alt="user" className='user-img' />
                        </div>

                }
            </div>
        </nav >
    )
}

export default Navbar;
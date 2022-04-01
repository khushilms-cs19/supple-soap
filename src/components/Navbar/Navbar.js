import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logonew from "../../images/logonew.svg";
import user from "../../images/user.png";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { userConstants } from '../../redux/actions/userActions';
import CartDetails from './CartDetails';
function Navbar(props) {
    const [currentMove, setCurrentMove] = useState("up");
    const [prevScrollY, setPrevScrollY] = useState(window.scrollY);
    const userData = useSelector((data) => data.userData);
    const [showCart, setShowCart] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const history = useHistory();
    const logoutUser = () => {
        localStorage.clear();
        dispatch({
            type: userConstants.USER_CLEAR_DATA,
        })
        navigate("/");
    }
    const closeCartModal = () => {
        setShowCart(false);
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
        // window.removeEventListener("scroll", onScroll);
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, [prevScrollY]);
    // const direction = prevScrollY >= window.scrollY ? "up" : "down";
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
                {
                    userData.isAuthenticated ?
                        <>
                            <button className='navbar-buttons-login' onClick={logoutUser}>Logout</button>
                            <div className='navbar-buttons-cart-container' >
                                <ShoppingCartIcon fontSize='large' color="#554e45" onClick={() => setShowCart((prevState) => !prevState)} />
                                <p className='navbar-buttons-cart-size'>{userData.cart.length}</p>
                                {
                                    showCart &&
                                    <CartDetails closeCartModal={closeCartModal} />
                                }
                            </div>
                        </>
                        :
                        <>
                            <button className='navbar-buttons-signin' onClick={props.openSignupModal}>Sign up</button>
                            <button onClick={props.openLoginModal} className='navbar-buttons-login'>Log in</button>
                        </>
                }
                <div className='user-img-container'>
                    <img src={user} alt="user" className='user-img' />
                </div>
            </div>
        </nav >
    )
}

export default Navbar;
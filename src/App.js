import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import BestSellers from './components/Home/BestSellers/BestSellers';
import ExperienceSupple from './components/Home/ExperieceSupple/ExperienceSupple';
import Navbar from './components/Navbar/Navbar';
import About from './components/Home/About/About';
import ContactUs from './components/Home/ContactUs/ContactUs';
import HomeFooter from './components/Home/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Customize from './components/Customize/Customize';
import Products from './components/Products/Products';
import Product from './components/Product.js/Product';
import useRequests from './hooks/useRequest';
import { useDispatch } from 'react-redux';
import { productsConstants } from './redux/actions/productsActions';
import { userConstants } from './redux/actions/userActions';
import SignupModal from './components/Modals/SignupModal';
import LoginModal from './components/Modals/LoginModal';
import Checkout from './components/Checkout/Checkout';
import ProtectedRoute from './ProtectedRoute';
import Profile from './components/Profile/Profile';
import AdminProtectedRoute from './AdminProtectedRoute';
import Admin from './components/Admin/Admin';
import AdminContainer from './components/Admin/AdminContainer';
import AdminLogin from './components/Admin/AdminLogin';
function App() {
    const dispatch = useDispatch();
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messageFromServer, setMessageFromServer] = useState("");
    const closeModal = () => {
        setShowSignupModal(false);
        setShowLoginModal(false);
    }
    const openSignupModal = () => {
        setShowSignupModal(true);
    }
    const openLoginModal = () => {
        setShowLoginModal(true);
    }
    const openMessageModal = () => {
        setShowMessageModal(true);
    }
    const closeMessageModal = () => {
        setShowMessageModal(false);
    }
    const showMessageFromServer = (message) => {
        setMessageFromServer(message);
        openMessageModal();
        setTimeout(() => {
            closeMessageModal();
            setMessageFromServer("");
        }, 3000);
    }
    const { doRequest: getAllProducts, errors: productsError } = useRequests({
        route: "/products",
        method: "get",
        body: null,
        onSuccess: (data) => {
            dispatch(
                {
                    type: productsConstants.PRODUCTS_UPDATE_DATA,
                    payload: data
                });
        }
    });
    const { doRequest: getUserData, errors: userError } = useRequests({
        route: "/user/data",
        method: "get",
        body: null,
        onSuccess: (data) => {
            dispatch({
                type: userConstants.USER_UPDATE_ALL_DATA,
                payload: data,
            })
        },
    });
    const scrollToAbout = () => {
        aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
    const scrollToContact = () => {
        contactUsRef.current.scrollIntoView({ behavior: "smooth" });
    }
    const aboutRef = useRef();
    const contactUsRef = useRef();
    useEffect(() => {
        getAllProducts();
        if (localStorage.getItem("user")) {
            console.log("fetching the user data.");
            getUserData().then(() => {
                console.log("Authorized");
                dispatch({
                    type: userConstants.UPDATE_USER_AUTHENTICATION_STATUS,
                    payload: true,
                })
            }).catch((err) => {
                console.log(err);
                localStorage.clear();
            });
        }
    }, []);
    return (
        <div className="App" >
            <Navbar scrollToAbout={scrollToAbout} scrollToContact={scrollToContact} openSignupModal={openSignupModal} openLoginModal={openLoginModal} showCart={showCart} setShowCart={setShowCart} />
            {
                showSignupModal &&
                <div className='modal-overlay'>
                    <SignupModal closeModal={closeModal} openLoginModal={openLoginModal} />
                </div>
            }
            {
                showLoginModal &&
                <div className='modal-overlay'>
                    <LoginModal closeModal={closeModal} openSignupModal={openSignupModal} />
                </div>
            }
            {
                showMessageModal &&
                <React.Fragment>
                    <div className='modal-overlay'>
                        <div className='main-modal-container'>
                            <div className='main-modal-top'>
                                <p className='modal-cross-button' onClick={closeMessageModal}>&#x292B;</p>
                            </div>
                            <p className='main-modal-message'>{messageFromServer}</p>
                        </div>
                    </div>
                </React.Fragment>
            }
            <Routes>
                <Route path='/' element={<React.Fragment>
                    <ExperienceSupple />
                    <BestSellers />
                    <About ref={aboutRef} />
                    <ContactUs ref={contactUsRef} showMessage={showMessageFromServer} />
                    <HomeFooter />
                </React.Fragment>} />
                <Route path="customize" element={
                    <ProtectedRoute>
                        <Customize />
                    </ProtectedRoute>
                } />
                <Route path="products" element={<Products />} />
                <Route path="products/:productId" element={<Product openSignupModal={openSignupModal} setShowCart={setShowCart} />} />
                <Route path="/user/checkout" element={<Checkout showMessage={showMessageFromServer} />} />
                <Route path="/user/profile" element={
                    <ProtectedRoute>
                        <Profile showMessage={showMessageFromServer} />
                    </ProtectedRoute>
                } />
                <Route path="/admin/dashboard" element={
                    <AdminProtectedRoute>
                        <Admin />
                    </AdminProtectedRoute>
                } />
                <Route path="/admin/login" element={
                    <AdminLogin />
                } />
                <Route path="*" element={<p>The page does not exist</p>} />
            </Routes>
        </div>
    );
}

export default App;

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
function App() {
    const dispatch = useDispatch();
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
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
            <Navbar scrollToAbout={scrollToAbout} scrollToContact={scrollToContact} openSignupModal={openSignupModal} openLoginModal={openLoginModal} />
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
            <Routes>
                <Route path='/' element={<>
                    <ExperienceSupple />
                    <BestSellers />
                    <About ref={aboutRef} />
                    <ContactUs ref={contactUsRef} />
                    <HomeFooter />
                </>} />
                <Route path="customize" element={
                    <ProtectedRoute>
                        <Customize />
                    </ProtectedRoute>
                } />
                <Route path="products" element={<Products />} />
                <Route path="products/:productId" element={<Product openSignupModal={openSignupModal} />} />
                <Route path="/user/checkout" element={<Checkout />} />
                <Route path="/user/profile" element={<Profile />} />
                <Route path="*" element={<p>The page does not exist</p>} />
            </Routes>
        </div>
    );
}

export default App;

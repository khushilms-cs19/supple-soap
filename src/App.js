import './App.css';
import React, { useRef } from 'react';

import BestSellers from './components/Home/BestSellers/BestSellers';
import ExperienceSupple from './components/Home/ExperieceSupple/ExperienceSupple';
import Navbar from './components/Navbar/Navbar';
import About from './components/Home/About/About';
import ContactUs from './components/Home/ContactUs/ContactUs';
import HomeFooter from './components/Home/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Customize from './components/Customize/Customize';
function App() {
    const scrollToAbout = () => {
        aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
    const scrollToContact = () => {
        contactUsRef.current.scrollIntoView({ behavior: "smooth" });
    }
    const aboutRef = useRef();
    const contactUsRef = useRef();

    return (
        <div className="App" >
            <Navbar scrollToAbout={scrollToAbout} scrollToContact={scrollToContact} />
            <Routes>
                <Route path='/' element={<>
                    <ExperienceSupple />
                    <BestSellers />
                    <About ref={aboutRef} />
                    <ContactUs ref={contactUsRef} />
                    <HomeFooter />
                </>} />
                <Route path="customize" element={<Customize />} />
            </Routes>
        </div>
    );
}

export default App;

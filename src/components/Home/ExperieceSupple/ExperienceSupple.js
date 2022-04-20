import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import stock1 from "../../../images/stock 1.jpg";
import stock2 from "../../../images/stock 2.jpg";
import stock3 from "../../../images/stock 3.jpg";


function ExperienceSupple() {
    const [activeSlide, setActiveSlide] = useState(0);
    const goNext = () => {
        setActiveSlide((prevValue) => (prevValue + 1) % 3);
    }
    const navigate = useNavigate();
    const goPrev = () => {
        setActiveSlide((prevValue) => {
            if (prevValue === 0) {
                return 2;
            } else {
                return prevValue - 1;
            }
        })
    }
    useEffect(() => {
        const sliderTimer = setInterval(() => {
            setActiveSlide((prevValue) => (prevValue + 1) % 3);
        }, 5000);
        return () => {
            clearInterval(sliderTimer);
        }
    }, []);
    return (
        <div className='hero'>
            <div className='slider-container'>
                <div className='slider-overlay'>
                    <div className='slider-overlay-arrows'>
                        <img src="https://img.icons8.com/ios-filled/50/000000/back.png" onClick={goPrev} />

                        <img src="https://img.icons8.com/ios-filled/50/000000/forward--v1.png" onClick={goNext} />
                    </div>
                    <div className='slider-overlay-content'>
                        <h1>Experience Supple</h1>
                        <p>Premium Hand Made Bath Soaps</p>
                        <button onClick={() => navigate("/products")}>Explore Now <img src="https://img.icons8.com/ios-filled/50/ffffff/forward--v1.png" style={{ width: "20px" }} /></button>
                    </div>
                    <div className='slider-overlay-dots'>
                        <div className='slider-overlay-dots-container'>
                            <div style={{ backgroundColor: activeSlide === 0 ? "rgba(255,199,124,0.8)" : "rgba(255,255,255,0.8)" }}></div>
                            <div style={{ backgroundColor: activeSlide === 1 ? "rgba(255,199,124,0.8)" : "rgba(255,255,255,0.8)" }}></div>
                            <div style={{ backgroundColor: activeSlide === 2 ? "rgba(255,199,124,0.8)" : "rgba(255,255,255,0.8)" }}></div>
                        </div>
                    </div>
                </div>
                <div className='slider-image' style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                    <img src={stock1} alt="stock" />
                </div>
                <div className='slider-image' style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                    <img src={stock2} alt="stock" />
                </div>
                <div className='slider-image' style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                    <img src={stock3} alt="stock" />
                </div>
            </div>
        </div>
    )
}

export default ExperienceSupple;
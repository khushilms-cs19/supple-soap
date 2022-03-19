import React, { useEffect, useState } from 'react'
import stock1 from "../../../images/stock 1.jpg";
import stock2 from "../../../images/stock 2.jpg";
import stock3 from "../../../images/stock 3.jpg";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

function ExperienceSupple() {
    const [activeSlide, setActiveSlide] = useState(0);
    const goNext = () => {
        setActiveSlide((prevValue) => (prevValue + 1) % 3);
    }
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
                        <ArrowBackIosNewRoundedIcon color='white' fontSize='large' onClick={goPrev} />
                        <ArrowForwardIosRoundedIcon color="white" fontSize='large' onClick={goNext} />
                    </div>
                    <div className='slider-overlay-content'>
                        <h1>Experience Supple</h1>
                        <p>Premium Hand Made Bath Soaps</p>
                        <button>Explore Now <ArrowForwardRoundedIcon color="white" fontSize="small" /></button>
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
import React, { useState } from 'react'
import BaseSelect from './components/BaseSelect';
import EssentialOilSelect from './components/EssentialOilSelect';
import FragranceSelect from './components/FragranceSelect';
import ScrubSelect from './components/ScrubSelect';
import TypeSelect from './components/TypeSelect';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import YourSelection from './components/YourSelection';

function Customize() {
    const [activeSlide, setActiveSlide] = useState(0);
    const goToNextSlide = () => {
        setActiveSlide((prevValue) => {
            if (prevValue === 5) {
                return prevValue;
            }
            return (prevValue + 1) % 6
        })
    }
    const goToPrevSlide = () => {
        setActiveSlide((prevValue) => {
            if (prevValue === 0) {
                return 0;
            }
            return prevValue - 1;
        })
    }
    return (
        <div className='customize-container'>
            <h1 className='customize-title'>Customize</h1>
            <div className='customize-components'>
                <div className="customize-card-container">
                    {
                        activeSlide === 0 &&
                        <BaseSelect />
                    }
                    {
                        activeSlide === 1 &&
                        <ScrubSelect />
                    }
                    {
                        activeSlide === 2 &&
                        <TypeSelect />
                    }
                    {
                        activeSlide === 3 &&
                        <FragranceSelect />
                    }
                    {
                        activeSlide === 4 &&
                        <EssentialOilSelect />
                    }
                    {
                        activeSlide === 5 &&
                        <YourSelection />
                    }
                    <div className='customize-card-button-container'>
                        {
                            !(activeSlide === 0) &&
                            <button className='customize-card-button-back' onClick={goToPrevSlide}>
                                Back
                            </button>
                        }
                        {
                            !(activeSlide === 5) &&
                            <button className="customize-card-button-next" onClick={goToNextSlide}>
                                Next
                                <ArrowForwardRoundedIcon fontSize='small' color="white" />
                            </button>
                        }
                        {
                            activeSlide === 5 &&
                            <button className="customize-card-button-next" onClick={goToNextSlide}>
                                Confirm
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customize;
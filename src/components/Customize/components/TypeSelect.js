import React from 'react';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import pomegrenate from "../../../images/customize/pomegrenate.jpg";
import banana from "../../../images/customize/banana.jpg";
import lime from "../../../images/customize/lime.jpg";
import turmeric from "../../../images/customize/turmeric.jpg";
import aloevera from "../../../images/customize/aloevera.jpg";
import whey from "../../../images/customize/whey.jpg";
function TypeSelect() {
    return (
        <>
            <h4 className='customize-card-title'>Select your Type</h4>
            <div className='type-select-content'>
                <div className='type-select-content-item'>
                    <img src={pomegrenate} alt="pomegrenate" />
                    <p>Pomegranate & Rose</p>
                </div>
                <div className='type-select-content-item'>
                    <img src={banana} alt="banana" />
                    <p>Banana</p>
                </div>
                <div className='type-select-content-item'>
                    <img src={lime} alt="lime" />
                    <p>Orange & Lime</p>
                </div>
                <div className='type-select-content-item'>
                    <img src={turmeric} alt="turmeric" />
                    <p>Turmeric</p>
                </div>
                <div className='type-select-content-item'>
                    <img src={aloevera} alt="aloevera" />
                    <p>Aloevera</p>
                </div>
                <div className='type-select-content-item'>
                    <img src={whey} alt="whey" />
                    <p>Whey</p>
                </div>
            </div>
        </>
    )
}

export default TypeSelect;
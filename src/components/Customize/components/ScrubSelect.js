import React from 'react';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import coffee from "../../../images/customize/coffee.jpg";
import honey from "../../../images/customize/honey.png";
import apricot from "../../../images/customize/apricot.jpg";
import almond from "../../../images/customize/almond.jpg";
import walnut from "../../../images/customize/walnut.jpg";
import charcoal from "../../../images/customize/charcoal.jpg";

function ScrubSelect() {
    return (
        <>
            <h4 className='customize-card-title'>Select your Scrub</h4>
            <div className='scrub-select-content'>
                <div className='scrub-select-content-item'>
                    <img src={coffee} alt="coffee" />
                    <p>Coffee</p>
                </div>
                <div className='scrub-select-content-item'>
                    <img src={honey} alt="honey" />
                    <p>Honey & Sugar</p>
                </div>
                <div className='scrub-select-content-item'>
                    <img src={apricot} alt="apricot" />
                    <p>Apricot</p>
                </div>
                <div className='scrub-select-content-item'>
                    <img src={almond} alt="almond" />
                    <p>Almond</p>
                </div>
                <div className='scrub-select-content-item'>
                    <img src={walnut} alt="walnut" />
                    <p>Walnut</p>
                </div>
                <div className='scrub-select-content-item'>
                    <img src={charcoal} alt="charcoal" />
                    <p>Charcoal</p>
                </div>
            </div>
        </>
    )
}

export default ScrubSelect;
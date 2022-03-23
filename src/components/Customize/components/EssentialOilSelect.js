import React from 'react';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import cinnamon from "../../../images/customize/cinnamon.jpg";
import clove from "../../../images/customize/clove.jpg";
import basil from "../../../images/customize/basil.jpg";
import lavender from "../../../images/customize/lavender.jpg";
import rose from "../../../images/customize/rose.jpg";
import berryoil from "../../../images/customize/berryoil.jpg";

function EssentialOilSelect() {
    return (
        <>
            <h4 className='customize-card-title'>Select your Essential</h4>
            <div className='essential-oil-select-content'>
                <div className='essential-oil-select-content-item'>
                    <img src={cinnamon} alt="cinnamon" />
                    <p>Cinnamon Oil</p>
                </div>
                <div className='essential-oil-select-content-item'>
                    <img src={clove} alt="clove" />
                    <p>Floral Oil</p>
                </div>
                <div className='essential-oil-select-content-item'>
                    <img src={basil} alt="basil" />
                    <p>Basil Oil</p>
                </div>
                <div className='essential-oil-select-content-item'>
                    <img src={lavender} alt="lavender" />
                    <p>Lavender Oil</p>
                </div>
                <div className='essential-oil-select-content-item'>
                    <img src={rose} alt="rose" />
                    <p>Rose Oil</p>
                </div>
                <div className='essential-oil-select-content-item'>
                    <img src={berryoil} alt="berryoil" />
                    <p>Berry Oil</p>
                </div>
            </div>
        </>
    )
}

export default EssentialOilSelect;
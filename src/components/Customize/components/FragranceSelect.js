import React from 'react';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import aquamarine from "../../../images/customize/aquamarine.jpg";
import floral from "../../../images/customize/floral.jpg";
import berry from "../../../images/customize/berry.jpg";
import oriental from "../../../images/customize/oriental.jpg";
import woody from "../../../images/customize/woody.jpg";

function FragranceSelect() {
    return (
        <>
            <h4 className='customize-card-title'>Select your Fragrance</h4>
            <div className='fragrance-select-content'>
                <div className='fragrance-select-content-item'>
                    <img src={aquamarine} alt="aquamarine" />
                    <p>Aqua Marine</p>
                </div>
                <div className='fragrance-select-content-item'>
                    <img src={floral} alt="floral" />
                    <p>Floral</p>
                </div>
                <div className='fragrance-select-content-item'>
                    <img src={berry} alt="berry" />
                    <p>
                        Berry
                    </p>
                </div>
                <div className='fragrance-select-content-item'>
                    <img src={oriental} alt="oriental" />
                    <p>Oriental</p>
                </div>
                <div className='fragrance-select-content-item'>
                    <img src={woody} alt="woody" />
                    <p>Woody</p>
                </div>
            </div>
        </>
    )
}

export default FragranceSelect;
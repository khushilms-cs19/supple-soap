import React from 'react'
import sheaButter from "../../../images/customize/sheabutter.jpg";
import glycerin from "../../../images/customize/glycerin.jpg";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
function BaseSelect(props) {
    return (
        <>
            <h4 className='customize-card-title'>Select your Base</h4>
            <div className='base-select-content'>
                <div className='base-select-content-item'>
                    <img src={sheaButter} alt="shea-butter" />
                    <p>Shea Butter</p>
                </div>
                <div className='base-select-content-item'>
                    <img src={glycerin} alt="glycerin" />
                    <p>Glycerin</p>
                </div>
            </div>
        </>
    )
}

export default BaseSelect;
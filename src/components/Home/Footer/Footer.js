import React from 'react'
import FacebookSVG from "../../../images/facebook.svg";
import InstaSVG from "../../../images/instagram.svg";
import TwitterSVG from "../../../images/twitter.svg";
import LinkdeinSVG from "../../../images/linkedin.svg";
import FlowerIcon from "../../../images/flowericon.svg";

function HomeFooter() {
    return (
        <div className='home-footer'>
            <h3 className='home-footer-title'>Follow</h3>
            <div className='home-footer-icons'>
                <img src={FacebookSVG} alt="facebook" />
                <img src={InstaSVG} alt="instagram" />
                <img src={TwitterSVG} alt="twitter" />
                <img src={LinkdeinSVG} alt="linkedin" />
            </div>
            <div className='home-footer-underline'>
                <div className='home-footer-underline-line'></div>
                <img src={FlowerIcon} alt="flower" />
                <div className='home-footer-underline-line'></div>
            </div>
            <p className='home-footer-copyright'>©2022 by supple.</p>
        </div>
    )
}

export default HomeFooter;
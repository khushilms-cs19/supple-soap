import React, { useState } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function SoapDescription(props) {
    const top = "5px 5px 0px 0px";
    const bottom = "0px 0px 5px 5px";
    const moveTop = "translateY(-110px)";
    const moveDown = "translateY(110px)";
    const [mouseOver, setMouseOver] = useState(false);
    return (
        <div className='bestseller-grid-item'>
            {
                props.imgDirection === "down" &&
                <React.Fragment>
                    <div className='bestseller-grid-item-content' style={{ borderRadius: top, transform: mouseOver ? moveTop : "" }} onMouseEnter={() => {
                        setMouseOver(true);
                    }} onMouseLeave={() => setMouseOver(false)}>
                        <button>
                            Shop Now
                            <ArrowForwardIosIcon color="black" fontSize="small" />
                        </button>
                        <p>{props.item.description}</p>
                    </div>
                    <div className='bestseller-grid-item-image' style={{ borderRadius: bottom, transform: mouseOver ? moveDown : "" }} onMouseEnter={() => {
                        setMouseOver(true);
                    }} onMouseLeave={() => setMouseOver(false)}>
                        <img src={props.item.image} alt="" style={{ borderRadius: bottom }} />
                    </div>
                </React.Fragment>
            }
            {
                props.imgDirection === "up" &&
                <React.Fragment>
                    <div className='bestseller-grid-item-image' style={{ borderRadius: top, transform: mouseOver ? moveTop : "" }} onMouseEnter={() => {
                        setMouseOver(true);
                    }} onMouseLeave={() => setMouseOver(false)}>
                        <img src={props.item.image} alt="" style={{ borderRadius: top }} />
                    </div>
                    <div className='bestseller-grid-item-content' style={{ borderRadius: bottom, transform: mouseOver ? moveDown : "" }} onMouseEnter={() => {
                        setMouseOver(true);
                    }} onMouseLeave={() => setMouseOver(false)}>
                        <button>
                            Shop Now
                            <ArrowForwardIosIcon color="black" fontSize="small" />
                        </button>
                        <p>{props.item.description}</p>
                    </div>
                </React.Fragment>

            }
        </div>
    )
}

export default SoapDescription;
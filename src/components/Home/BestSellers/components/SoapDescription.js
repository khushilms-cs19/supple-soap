import React, { useState } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function SoapDescription(props) {
    const [mouseOver, setMouseOver] = useState(false);
    const top = `10px 10px ${!mouseOver ? 10 : 0}px ${!mouseOver ? 10 : 0}px`;
    const bottom = `${!mouseOver ? 10 : 0}px ${!mouseOver ? 10 : 0}px 10px 10px`;
    const moveTop = "translateY(-110px)";
    const moveDown = "translateY(110px)";
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
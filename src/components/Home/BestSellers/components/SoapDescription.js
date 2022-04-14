import React, { useState } from 'react'
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';

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
                        <Link to={`/products/${props.productId}`} style={{ textDecoration: "none" }}>
                            <button>
                                Shop Now
                                <img src="https://img.icons8.com/ios-filled/50/000000/forward--v1.png" style={{ width: "20px" }} />
                            </button>
                        </Link>
                        <p>{(props.item.description.split(" ").slice(0, 32)).join(" ")} . . .</p>
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
                        <Link to={`/products/${props.productId}`} style={{ textDecoration: "none" }}>
                            <button>
                                Shop Now
                                <img src="https://img.icons8.com/ios-filled/50/000000/forward--v1.png" style={{ width: "20px" }} />
                            </button>
                        </Link>
                        <p>{(props.item.description.split(" ").slice(0, 32)).join(" ")} . . .</p>
                    </div>
                </React.Fragment>

            }
        </div>
    )
}

export default SoapDescription;
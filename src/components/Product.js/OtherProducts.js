import React from 'react';
import product2 from "../../images/product 2.jpg";
import product3 from "../../images/product 3.jpg";
import product4 from "../../images/product 4.jpg";
import { ChevronRightRounded } from '@mui/icons-material';
import { ChevronLeftRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const OtherProductItem = (props) => {
    const navigate = useNavigate();
    const goToSoapMainPage = () => {
        window.scrollTo(0, 0);
        navigate(`/products/${props.link}`);
    }
    return (
        <div className='other-products-list-item'>
            <img src={props.image} alt="product2" />
            <p>{props.name}</p>
            <button onClick={goToSoapMainPage}>View more<ChevronRightRounded fontSize='medium' color='black' /></button>
        </div>
    )
}

function OtherProducts(props) {
    return (
        <div className='other-products-container'>
            <h2 className='other-products-title'>Other products you may like...</h2>
            <div className='other-products-list'>
                <ChevronLeftRounded fontSize='large' color="black" />
                <div className='other-products-list'>
                    {
                        props.products.map((product) => {
                            return <OtherProductItem key={product._id} productId={product._id} name={product.name} image={product.image} link={product._id} />
                        })
                    }
                </div>
                <ChevronRightRounded fontSize='large' color="black" />
            </div>
        </div>
    )
}

export default OtherProducts;
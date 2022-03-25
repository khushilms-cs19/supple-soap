import React from 'react';
import product2 from "../../images/product 2.jpg";
import product3 from "../../images/product 3.jpg";
import product4 from "../../images/product 4.jpg";
import { ChevronRightRounded } from '@mui/icons-material';
import { ChevronLeftRounded } from '@mui/icons-material';

function OtherProducts() {
    return (
        <div className='other-products-container'>
            <h2 className='other-products-title'>Other products you may like...</h2>
            <div className='other-products-list'>
                <ChevronLeftRounded fontSize='large' color="black" />
                <div className='other-products-list'>
                    <div className='other-products-list-item'>
                        <img src={product2} alt="product2" />
                        <p>Supple soap product</p>
                        <button>View more<ChevronRightRounded fontSize='medium' color='black' /></button>
                    </div>
                    <div className='other-products-list-item'>
                        <img src={product3} alt="product3" />
                        <p>Supple soap product</p>
                        <button>View more <ChevronRightRounded fontSize='medium' color='black' /></button>
                    </div>
                    <div className='other-products-list-item'>
                        <img src={product4} alt="product4" />
                        <p>Supple soap product</p>
                        <button>View more <ChevronRightRounded fontSize='medium' color='black' /></button>
                    </div>
                </div>
                <ChevronRightRounded fontSize='large' color="black" />
            </div>
        </div>
    )
}

export default OtherProducts;
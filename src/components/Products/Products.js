import React from 'react';
import product1 from "../../images/product 1.jpg";
import product2 from "../../images/product 2.jpg";
import product3 from "../../images/product 3.jpg";
import product4 from "../../images/product 4.jpg";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
function Products() {
    return (
        <div className='products-page-container'>
            <h1 className='products-page-title'>Supple's Special</h1>
            <div className='products-page-products'>
                <div className='products-page-products-item'>
                    <img src={product1} alt="product1" />
                    <p>Supples' Deep Conditioning Shea Butter Soap</p>
                    <div>
                        <button>
                            View More
                            <ChevronRightRoundedIcon color="black" fontSize="medium" />
                        </button>
                    </div>
                </div>
                <div className='products-page-products-item'>
                    <img src={product2} alt="product2" />
                    <p>Supple's Fine  Rice and Charcoal Scrub Soap</p>
                    <div>
                        <button>View More

                            <ChevronRightRoundedIcon color="black" fontSize="medium" />
                        </button>
                    </div>
                </div>
                <div className='products-page-products-item'>
                    <img src={product3} alt="product3" />
                    <p>Supple's Basil Honey Soap</p>
                    <div>
                        <button>View More

                            <ChevronRightRoundedIcon color="black" fontSize="medium" />
                        </button>
                    </div>
                </div>
                <div className='products-page-products-item'>
                    <img src={product4} alt="product4" />
                    <p>Supple's Clear Aloe Soap</p>
                    <div>
                        <button>
                            View More
                            <ChevronRightRoundedIcon color="black" fontSize="medium" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products;
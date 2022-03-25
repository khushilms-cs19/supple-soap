import React from 'react';
import product1 from "../../images/product 1.jpg";
import OtherProducts from './OtherProducts';

function Product() {
    return (
        <>
            <div className='product-page-container'>
                <div className='product-page-card'>

                    <div className='product-page-image'>
                        <img src={product1} alt="" />
                    </div>
                    <div className='product-page-line'></div>
                    <div className='product-page-description'>
                        <div className='product-page-description-content'>
                            <h2 className='product-page-description-title'>Supples' Deep Conditioning Shea Butter Soap</h2>
                            <p className='product-page-description-text'>Supple's Deep conditioning Shea Butter Soap works wonder on the Skin. The innate qualities of the essential oils and Shea Butter will soothe , tone and moisturize the pores without clogging them</p>
                            <div>
                                <label htmlFor='quantity'>Quantity </label>
                                <div>
                                    <p>&#10006;</p>
                                    <input type="number" name="quantity" defaultValue={1} />
                                </div>
                            </div>
                        </div>
                        <div className='product-page-description-button-container'>
                            <button className='product-page-description-button'>Add To Cart</button>
                            <button className='product-page-description-button'>Order Now</button>
                        </div>
                    </div>
                </div>
                <OtherProducts />
            </div >
        </>
    )
}

export default Product;
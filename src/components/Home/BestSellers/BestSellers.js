import React from 'react'
import { useSelector } from 'react-redux';
import curlUnderline from "../../../images/curl_underline.png";
import product1 from "../../../images/product 1.jpg";
import product2 from "../../../images/product 2.jpg";
import product3 from "../../../images/product 3.jpg";
import product4 from "../../../images/product 4.jpg";
import SoapDescription from './components/SoapDescription';
const DUMMY_DATA = [
    {
        id: 1,
        description: "Supple's Deep conditioning Shea Butter Soap works wonder on the Skin. The innate qualities of the essential oils and Shea Butter will soothe , tone and moisturize the pores without clogging them",
        image: product1,
    },
    {
        id: 2,
        description: "Supple's Deep conditioning Shea Butter Soap works wonder on the Skin. The innate qualities of the essential oils and Shea Butter will soothe , tone and moisturize the pores without clogging them",
        image: product2,
    },
    {
        id: 3,
        description: "Supple's Deep conditioning Shea Butter Soap works wonder on the Skin. The innate qualities of the essential oils and Shea Butter will soothe , tone and moisturize the pores without clogging them",
        image: product3,
    },
    {
        id: 4,
        description: "Supple's Deep conditioning Shea Butter Soap works wonder on the Skin. The innate qualities of the essential oils and Shea Butter will soothe , tone and moisturize the pores without clogging them",
        image: product4,
    },
]
const BestSellers = (props) => {
    const products = useSelector((state) => state.products.products);
    return (
        <div className='bestseller-container' >
            <div className='bestseller-overlay'></div>
            <h1>BEST SELLERS</h1>
            <img src={curlUnderline} alt="underline" className='bestseller-underline' />
            <div className='bestseller-grid'>
                {
                    products.map((item, index) => {
                        if (index % 2 === 0) {
                            return <SoapDescription item={item} key={item._id} imgDirection={"down"} productId={item._id} />
                        } else {
                            return <SoapDescription item={item} key={item._id} imgDirection={"up"} productId={item._id} />
                        }
                    })
                }

            </div>
        </div>
    )
}

export default BestSellers;
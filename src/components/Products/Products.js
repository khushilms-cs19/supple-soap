import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import product1 from "../../images/product 1.jpg";
import product2 from "../../images/product 2.jpg";
import product3 from "../../images/product 3.jpg";
import product4 from "../../images/product 4.jpg";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
const ProductsItem = (props) => {
    return (
        <div className='products-page-products-item'>
            <img src={props.image} alt="product3" />
            <p>{props.name}</p>
            <div>
                <Link to={`/products/${props.productId}`} style={{ textDecoration: "none" }} >
                    <button>View More
                        <ChevronRightRoundedIcon color="black" fontSize="medium" />
                    </button>
                </Link>
            </div>
        </div>
    )
}

function Products() {
    const products = useSelector((state) => state.products.products);
    return (
        <div className='products-page-container'>
            <h1 className='products-page-title'>Supple's Special</h1>
            <div className='products-page-products'>
                {
                    products.map((product) => {
                        return <ProductsItem key={product._id} productId={product._id} name={product.name} image={product.image} />
                    })
                }
            </div>
        </div>
    )
}

export default Products;
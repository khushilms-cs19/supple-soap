import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CartDetails from '../Navbar/CartDetails';

function Checkout() {
    // const userData = useSelector((state) => state.userData);
    // const dispatch = useDispatch();
    return (
        <div className='cart-main-page-container'>
            <CartDetails mainPage={true} />
        </div>
    )
}

export default Checkout;
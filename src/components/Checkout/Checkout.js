import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CartDetails from '../Navbar/CartDetails';

function Checkout(props) {
    // const userData = useSelector((state) => state.userData);
    // const dispatch = useDispatch();
    return (
        <div className='cart-main-page-container'>
            <CartDetails mainPage={true} showMessage={props.showMessage} />
        </div>
    )
}

export default Checkout;
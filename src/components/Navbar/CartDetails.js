import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { userConstants } from '../../redux/actions/userActions';
function CartDetails(props) {
    const userData = useSelector((state) => state.userData);
    const dispatch = useDispatch();

    const removeFromCart = (productId) => {
        if (!userData.isAuthenticated) {
            props.openSignupModal();
            return;
        }
        const cartData = [...userData.cart].filter((item) => item.productId !== productId);

        axios({
            method: "PUT",
            baseURL: "http://localhost:5000/user/cart/update",
            data: cartData,
            headers: {
                "Authentication": localStorage.getItem("user"),
            }
        }).then((data) => {
            console.log(data.data);
            dispatch({
                type: userConstants.UPDATE_CART_DATA,
                payload: data.data.cart,
            });
        }).catch((err) => {
            alert("There was some error", err);
        })
    }
    return (
        <div className='cart-modal-container'>
            <div className='cart-modal-title'>
                <h3 >My Cart</h3>
                <div onClick={props.closeCartModal}>
                    <p className='modal-cross-button'>&#x292B;</p>
                </div>
            </div>
            <div className='cart-modal-list'>

                {
                    userData.cart.length === 0 ?
                        <p>The cart is empty</p> :
                        userData.cart.map((item) => {
                            return (
                                <div className='cart-modal-item' key={item.productId}>
                                    <img src={item.productData.image} alt="soap" />
                                    <p>{item.productData.name}</p>
                                    <span>{`x${item.quantity}`}</span>
                                    <DeleteIcon fontSize='medium' onClick={() => removeFromCart(item.productId)} />
                                </div>
                            )
                        })
                }
            </div>
            <button className='cart-modal-button-checkout' disabled={userData.cart.length === 0}>
                Checkout
            </button>
        </div>
    )
}

export default CartDetails;
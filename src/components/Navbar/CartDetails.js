import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { userConstants } from '../../redux/actions/userActions';
import soap from "../../images/soap.png";
import { useLocation, useNavigate } from 'react-router-dom';
function CartDetails(props) {
    const userData = useSelector((state) => state.userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const capitalizeName = (name) => {
        return name.split(" ").map((n) => n[0].toUpperCase() + n.slice(1)).join(" ");
    }
    const removeFromCartRegular = (productId) => {
        // if (!userData.isAuthenticated) {
        //     props.openSignupModal();
        //     return;
        // }
        const cartData = [...userData.cart.regularProducts].filter((item) => item.productId !== productId);

        axios({
            method: "PUT",
            baseURL: "http://localhost:5000/user/cart/update",
            data: {
                ...userData.cart,
                regularProducts: cartData,
            },
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
    const removeFromCartCustomized = (productIndex) => {
        // if (!userData.isAuthenticated) {
        //     props.openSignupModal();
        //     return;
        // }
        const cartData = [...userData.cart.customizedProducts].filter((item, index) => index !== productIndex);
        axios({
            method: "PUT",
            baseURL: "http://localhost:5000/user/cart/update",
            data: {
                ...userData.cart,
                customizedProducts: cartData,
            },
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
    const placeOrderHandler = async () => {
        const cartData = userData.cart;
        // props.closeCartModal();
        // console.log(cartData);
        if (cartData.regularProducts.length !== 0) {
            axios({
                method: "POST",
                baseURL: "http://localhost:5000/order/regular",
                data: cartData.regularProducts,
                headers: {
                    "Authentication": localStorage.getItem("user"),
                }
            }).then((data) => {
                console.log(data.data);
                dispatch({
                    type: userConstants.USER_CLEAR_REGULAR_PRODUCTS
                });
            }).catch((err) => {
                console.log(err);
            })
        }
        if (cartData.customizedProducts.length !== 0) {
            axios({
                method: "POST",
                baseURL: "http://localhost:5000/order/customized",
                data: cartData.customizedProducts,
                headers: {
                    "Authentication": localStorage.getItem("user"),
                }
            }).then((data) => {
                console.log(data.data);
                dispatch({
                    type: userConstants.USER_CLEAR_CUSTOMIZED_PRODUCTS,
                });
                navigate("/");
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    return (
        <div className={`cart-modal-container ${!props.mainPage && "cart-modal-absolute"}`}>
            <div className='cart-modal-title'>
                <h3 >My Cart</h3>
                <div onClick={props.closeCartModal}>
                    {
                        !props.mainPage &&
                        <p className='modal-cross-button'>&#x292B;</p>
                    }
                </div>
            </div>
            <div className='cart-modal-list'>
                {
                    userData.cart.regularProducts.length === 0 ?
                        <p>{userData.cart.customizedProducts.length === 0 && "The cart is empty"}</p> :
                        userData.cart.regularProducts.map((item) => {
                            return (
                                <div className='cart-modal-item' key={item.productId}>
                                    <img src={item.productData.image} alt="soap" />
                                    <p>{item.productData.name}</p>
                                    <span>{`x${item.quantity}`}</span>

                                    <DeleteIcon fontSize='medium' onClick={() => removeFromCartRegular(item.productId)} />
                                </div>
                            )
                        })
                }
                {
                    userData.cart.customizedProducts.length !== 0 &&
                    <>
                        <h4 style={{ borderBottom: "2px solid black" }}>Customized Products</h4>
                        {
                            userData.cart.customizedProducts.length === 0 ?
                                <p>The cart is empty</p> :
                                userData.cart.customizedProducts.map((item, index) => {
                                    return (
                                        <div className='cart-modal-item' key={index}>
                                            <img src={soap} alt="soap" />
                                            <p>{capitalizeName(item.base)}, {capitalizeName(item.scrub)}, {capitalizeName(item.type)}, {capitalizeName(item.fragrance)}, {capitalizeName(item.essentialOil)}</p>
                                            <span>{`x${item.quantity}`}</span>
                                            <DeleteIcon fontSize='medium' onClick={() => removeFromCartCustomized(index)} />
                                        </div>
                                    )
                                })
                        }
                    </>
                }
            </div>
            {
                location.pathname !== "/user/checkout" ?
                    <button className='cart-modal-button-checkout' disabled={userData.cart.regularProducts.length === 0 && userData.cart.customizedProducts.length === 0} onClick={() => {
                        navigate("/user/checkout")
                    }}>
                        Checkout
                    </button>
                    :
                    <button className='cart-modal-button-checkout' disabled={userData.cart.regularProducts.length === 0 && userData.cart.customizedProducts.length === 0} onClick={placeOrderHandler}>
                        Place Order
                    </button>
            }
        </div>
    )
}

export default CartDetails;
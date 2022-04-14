import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { userConstants } from '../../redux/actions/userActions';
import soap from "../../images/soap.png";
import { useLocation, useNavigate } from 'react-router-dom';
// import Razorpay from "razorpay";
const loadRazorPay = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(script);
        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
    })
}
function CartDetails(props) {
    const userData = useSelector((state) => state.userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const capitalizeName = (name) => {
        return name.split(" ").map((n) => n[0].toUpperCase() + n.slice(1)).join(" ");
    }
    // const displayRazorPay = async () => {
    //     const res = await loadRazorPay();
    //     if (!res) {
    //         alert("Razorpay SDK failed to load. are you online?");
    //         return;
    //     }
    //     var options = {
    //         key: "rzp_test_VLLfMJPNaGSkxT", // Enter the Key ID generated from the Dashboard
    //         amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //         currency: "INR",
    //         name: "Acme Corp",
    //         description: "Test Transaction",
    //         image: "https://example.com/your_logo",
    //         order_id: "order_IluGWxBm9U8zJ8", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //         callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
    //         prefill: {
    //             "name": "Gaurav Kumar",
    //             "email": "gaurav.kumar@example.com",
    //             "contact": "9999999999"
    //         },
    //         notes: {
    //             "address": "Razorpay Corporate Office"
    //         },
    //         theme: {
    //             "color": "#3399cc"
    //         }
    //     };
    //     // var rzp1 = new Razorpay(options);
    // }

    const updateCartInDB = async (cartData) => {
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
    const removeFromCartRegular = async (productId) => {
        // if (!userData.isAuthenticated) {
        //     props.openSignupModal();
        //     return;
        // }
        const cartData = [...userData.cart.regularProducts].filter((item) => item.productId !== productId);
        const finalCartData = {
            ...userData.cart,
            regularProducts: cartData,
        }
        await updateCartInDB(finalCartData);
        // axios({
        //     method: "PUT",
        //     baseURL: "http://localhost:5000/user/cart/update",
        //     data: {
        //         ...userData.cart,
        //         regularProducts: cartData,
        //     },
        //     headers: {
        //         "Authentication": localStorage.getItem("user"),
        //     }
        // }).then((data) => {
        //     console.log(data.data);
        //     dispatch({
        //         type: userConstants.UPDATE_CART_DATA,
        //         payload: data.data.cart,
        //     });
        // }).catch((err) => {
        //     alert("There was some error", err);
        // })
    }
    const removeFromCartCustomized = async (productIndex) => {
        // if (!userData.isAuthenticated) {
        //     props.openSignupModal();
        //     return;
        // }
        const cartData = [...userData.cart.customizedProducts].filter((item, index) => index !== productIndex);
        const finalCartData = {
            ...userData.cart,
            customizedProducts: cartData,
        };
        await updateCartInDB(finalCartData);
        // axios({
        //     method: "PUT",
        //     baseURL: "http://localhost:5000/user/cart/update",
        //     data: {
        //         ...userData.cart,
        //         customizedProducts: cartData,
        //     },
        //     headers: {
        //         "Authentication": localStorage.getItem("user"),
        //     }
        // }).then((data) => {
        //     console.log(data.data);
        //     dispatch({
        //         type: userConstants.UPDATE_CART_DATA,
        //         payload: data.data.cart,
        //     });
        // }).catch((err) => {
        //     alert("There was some error", err);
        // })
    }
    const placeOrderHandler = async () => {
        const cartData = userData.cart;
        // props.closeCartModal();
        // console.log(cartData);
        if (cartData.regularProducts.length !== 0 || cartData.customizedProducts.length !== 0) {
            axios({
                method: "POST",
                baseURL: "http://localhost:5000/order/regular",
                data: cartData,
                headers: {
                    "Authentication": localStorage.getItem("user"),
                }
            }).then(async (data) => {
                console.log(data.data);
                dispatch({
                    type: userConstants.USER_CLEAR_REGULAR_PRODUCTS
                });
                dispatch({
                    type: userConstants.USER_CLEAR_CUSTOMIZED_PRODUCTS
                });
                await updateCartInDB({
                    regularProducts: [],
                    customizedProducts: [],
                })
                props.showMessage("The order has been placed successfully!");
            }).catch((err) => {
                console.log(err);
                props.showMessage(err);
            })
        }
        // if (cartData.customizedProducts.length !== 0) {
        //     console.log("customized product order placing");
        //     axios({
        //         method: "POST",
        //         baseURL: "http://localhost:5000/order/customized",
        //         data: cartData.customizedProducts,
        //         headers: {
        //             "Authentication": localStorage.getItem("user"),
        //         }
        //     }).then(async (data) => {
        //         console.log(data.data);
        //         dispatch({
        //             type: userConstants.USER_CLEAR_CUSTOMIZED_PRODUCTS,
        //         });
        //         await updateCartInDB({
        //             regularProducts: userData.cart.regularProducts,
        //             customizedProducts: [],
        //         })
        //         navigate("/");
        //     }).catch((err) => {
        //         console.log(err);
        //     })
        // }
    }
    return (
        <div className={`cart-modal-container ${!props.mainPage && "cart-modal-absolute"}`} >
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

                                    {/* <DeleteIcon fontSize='medium' onClick={() => removeFromCartRegular(item.productId)} /> */}
                                    <img src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png" onClick={() => removeFromCartRegular(item.productId)} style={{ width: "30px" }} />
                                </div>
                            )
                        })
                }
                {
                    userData.cart.customizedProducts.length !== 0 &&
                    <React.Fragment>
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
                                            {/* <DeleteIcon fontSize='medium' onClick={() => removeFromCartCustomized(index)} /> */}
                                            <img src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png" onClick={() => removeFromCartCustomized(index)} style={{ width: "30px" }} />
                                        </div>
                                    )
                                })
                        }
                    </React.Fragment>
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
import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { userConstants } from '../../redux/actions/userActions';
import soap from "../../images/soap.png";
import { useLocation, useNavigate } from 'react-router-dom';

function CartDetails(props) {
    const userData = useSelector((state) => state.userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [razorPayOrder, setRazorPayOrder] = useState({});
    const capitalizeName = (name) => {
        return name.split(" ").map((n) => n[0].toUpperCase() + n.slice(1)).join(" ");
    }
    const calculateTotalPrice = () => {
        const regularProducts = userData.cart.regularProducts;
        const customizedProducts = userData.cart.customizedProducts;
        let totalPrice = 0;
        regularProducts.forEach((ele) => {
            totalPrice += ele.productData.price * ele.quantity;
        });
        customizedProducts.forEach((ele) => {
            totalPrice += ele.quantity * 200;
        });
        return totalPrice;
    }
    const createRazorpayOrder = async () => {
        return await new Promise((resolve, reject) => {
            axios({
                method: "post",
                baseURL: "https://supple-soap-backend-api.herokuapp.com/order/razorpay-create-order",
                data: userData.cart,
                headers: {
                    "Authentication": localStorage.getItem("user"),
                }
            }).then((data) => {
                console.log(data.data.orderData);
                setRazorPayOrder(data.data.orderData);
                resolve(data.data.orderData);
            }).catch((err) => {
                console.log(err);
            })
        });
    }
    const displayRazorPay = async () => {
        // const res = await loadRazorPay();
        // if (!res) {
        //     alert("Razorpay SDK failed to load. are you online?");
        //     return;
        // }
        // console.log(razorPayOrder);
        const razorpayOrderData = await createRazorpayOrder();
        console.log(razorpayOrderData);
        const options = {
            key: "rzp_test_VLLfMJPNaGSkxT", // Enter the Key ID generated from the Dashboard
            amount: razorpayOrderData.amount_due, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Supple Soap",
            description: "Test Transaction",
            order_id: razorpayOrderData.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: function (response) {
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
                placeOrderHandler(response);
            },
            prefill: {
                name: userData.name,
                email: userData.email,
                contact: userData.phoneno,
            },
        };
        let rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    const updateCartInDB = async (cartData) => {
        axios({
            method: "PUT",
            baseURL: "https://supple-soap-backend-api.herokuapp.com/user/cart/update",
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

    }
    const placeOrderHandler = async (razorpayDetails) => {
        const cartData = userData.cart;
        if (cartData.regularProducts.length !== 0 || cartData.customizedProducts.length !== 0) {
            axios({
                method: "POST",
                baseURL: "https://supple-soap-backend-api.herokuapp.com/order/regular",
                data: {
                    ...cartData,
                    razorpay: {
                        paymentId: razorpayDetails.razorpay_payment_id,
                        orderId: razorpayDetails.razorpay_order_id,
                        signature: razorpayDetails.razorpay_signature,
                    }
                },
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
                                    <span>₹{item.productData.price * item.quantity}</span>
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
                                            <span>₹{item.quantity * 200}</span>
                                            {/* <DeleteIcon fontSize='medium' onClick={() => removeFromCartCustomized(index)} /> */}
                                            <img src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png" onClick={() => removeFromCartCustomized(index)} style={{ width: "30px" }} />
                                        </div>
                                    )
                                })
                        }
                    </React.Fragment>
                }
                {
                    (userData.cart.regularProducts.length !== 0 || userData.cart.customizedProducts.length !== 0) &&
                    <div className='cart-modal-total-price'>
                        <p>Total: ₹{calculateTotalPrice()}</p>
                    </div>
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
                    <button className='cart-modal-button-checkout' disabled={userData.cart.regularProducts.length === 0 && userData.cart.customizedProducts.length === 0} onClick={displayRazorPay}>
                        Place Order
                    </button>
            }
        </div>
    )
}

export default CartDetails;
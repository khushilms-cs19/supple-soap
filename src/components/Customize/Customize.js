import React, { useState, useRef } from 'react'
import BaseSelect from './components/BaseSelect';
import { userConstants } from '../../redux/actions/userActions';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import EssentialOilSelect from './components/EssentialOilSelect';
import FragranceSelect from './components/FragranceSelect';
import ScrubSelect from './components/ScrubSelect';
import TypeSelect from './components/TypeSelect';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import YourSelection from './components/YourSelection';
import { customizedOrderActions } from '../../redux/actions/customizedOrderAction';
import { useNavigate } from 'react-router-dom';

function Customize() {
    const [activeSlide, setActiveSlide] = useState(0);
    const customizedOrder = useSelector((state) => state.customizedOrder);
    const userData = useSelector((state) => state.userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const goToNextSlide = () => {
        setActiveSlide((prevValue) => {
            if (prevValue === 5) {
                return prevValue;
            }
            return (prevValue + 1) % 6
        })
    }
    const goToPrevSlide = () => {
        setActiveSlide((prevValue) => {
            if (prevValue === 0) {
                return 0;
            }
            return prevValue - 1;
        })
    }
    const addToCart = () => {
        const cartData = [...userData.cart.customizedProducts];
        const selectedItemInCart = cartData.findIndex((item) => {
            return (
                customizedOrder.base === item.base &&
                customizedOrder.scrub === item.scrub &&
                customizedOrder.type === item.type &&
                customizedOrder.fragrance === item.fragrance &&
                customizedOrder.essentialOil === item.essentialOil
            );
        });
        if (selectedItemInCart !== -1) {
            cartData[selectedItemInCart].quantity += customizedOrder.quantity;
        } else {
            cartData.push({
                ...customizedOrder,
            });
        }
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
            dispatch({
                type: customizedOrderActions.CLEAR_CART_DATA,
            });
            navigate("/")
        }).catch((err) => {
            alert("There was some error", err);
        });
    }
    return (
        <div className='customize-container'>
            <h1 className='customize-title'>Customize</h1>
            <div className='customize-components'>
                <div className="customize-card-container">
                    {
                        activeSlide === 0 &&
                        <BaseSelect />
                    }
                    {
                        activeSlide === 1 &&
                        <ScrubSelect />
                    }
                    {
                        activeSlide === 2 &&
                        <TypeSelect />
                    }
                    {
                        activeSlide === 3 &&
                        <FragranceSelect />
                    }
                    {
                        activeSlide === 4 &&
                        <EssentialOilSelect />
                    }
                    {
                        activeSlide === 5 &&
                        <YourSelection />
                    }
                    <div className='customize-card-button-container'>
                        {
                            !(activeSlide === 0) &&
                            <button className='customize-card-button-back' onClick={goToPrevSlide}>
                                Back
                            </button>
                        }
                        {
                            !(activeSlide === 5) &&
                            <button className="customize-card-button-next" onClick={goToNextSlide}>
                                Next
                                <ArrowForwardRoundedIcon fontSize='small' color="white" />
                            </button>
                        }
                        {
                            activeSlide === 5 &&
                            <button className="customize-card-button-next" onClick={addToCart}>
                                Add to Cart
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customize;
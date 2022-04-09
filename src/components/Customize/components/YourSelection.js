import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { customizedOrderActions } from '../../../redux/actions/customizedOrderAction';
import { userConstants } from '../../../redux/actions/userActions';
import axios from 'axios';

function YourSelection() {
    const customizedOrder = useSelector((state) => state.customizedOrder);
    const dispatch = useDispatch();
    const capitalizeName = (name) => {
        return name.split(" ").map((n) => n[0].toUpperCase() + n.slice(1)).join(" ");
    }
    const changeQuantity = (event) => {
        dispatch({
            type: customizedOrderActions.UPDATE_QUANTITY,
            payload: Number(event.target.value),
        });
    }
    return (
        <>
            <h4 className='your-order-title'>Your Order</h4>
            <div className='your-order-content'>
                <div className='your-order-item'>
                    <p>1. Base</p>
                    <p>{capitalizeName(customizedOrder.base)}</p>
                </div>
                <div className='your-order-item'>
                    <p>2. Scrub</p>
                    <p>{capitalizeName(customizedOrder.scrub)}</p>
                </div>
                <div className='your-order-item'>
                    <p>3. Type</p>
                    <p>{capitalizeName(customizedOrder.type)}</p>
                </div>
                <div className='your-order-item'>
                    <p>4. Fragrance</p>
                    <p>{capitalizeName(customizedOrder.fragrance)}</p>
                </div>
                <div className='your-order-item'>
                    <p>5. Essential Oil</p>
                    <p>{capitalizeName(customizedOrder.essentialOil)}</p>
                </div>
                <div className='your-order-quantity'>
                    <p htmlFor='quantity'>Quantity</p>
                    <p>x</p>
                    <input name="quantity" type={"number"} max={10} min={1} defaultValue={1} onChange={changeQuantity} />
                </div>
            </div>
        </>
    )
}

export default YourSelection;
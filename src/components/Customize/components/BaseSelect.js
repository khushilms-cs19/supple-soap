import React from 'react'
import sheaButter from "../../../images/customize/sheabutter.jpg";
import glycerin from "../../../images/customize/glycerin.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { customizedOrderActions } from '../../../redux/actions/customizedOrderAction';

function BaseSelect(props) {
    const selectedBase = useSelector((state) => state.customizedOrder.base);
    const dispatch = useDispatch();
    const selectItem = (event) => {
        // console.log(event.target.attributes.getNamedItem("data-base").value);
        const selectedItem = event.target.attributes.getNamedItem("data-base").value;
        dispatch({
            type: customizedOrderActions.UPDATE_BASE_DATA,
            payload: selectedItem,
        });
    }
    return (
        <React.Fragment>
            <h4 className='customize-card-title'>Select your Base</h4>
            <div className='base-select-content'>
                <div className={`base-select-content-item`} data-base="shea butter" onClick={selectItem} >
                    <img src={sheaButter} alt="shea-butter" className={`${selectedBase === "shea butter" && "active-customize-element"}`} data-base="shea butter" />
                    <p data-base="shea butter">Shea Butter</p>
                </div>
                <div className={`base-select-content-item`} data-base="glycerin" onClick={selectItem}>
                    <img src={glycerin} alt="glycerin" className={`${selectedBase === "glycerin" && "active-customize-element"}`} data-base="glycerin" />
                    <p data-base="glycerin">Glycerin</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BaseSelect;
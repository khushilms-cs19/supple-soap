import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { customizedOrderActions } from '../../../redux/actions/customizedOrderAction';
import pomegrenate from "../../../images/customize/pomegrenate.jpg";
import banana from "../../../images/customize/banana.jpg";
import lime from "../../../images/customize/lime.jpg";
import turmeric from "../../../images/customize/turmeric.jpg";
import aloevera from "../../../images/customize/aloevera.jpg";
import whey from "../../../images/customize/whey.jpg";
function TypeSelect() {
    const selectedType = useSelector((state) => state.customizedOrder.type);
    const dispatch = useDispatch();
    const selectItem = (event) => {
        const selectedItem = event.target.attributes.getNamedItem("data-type").value;
        dispatch({
            type: customizedOrderActions.UPDATE_TYPE_DATA,
            payload: selectedItem,
        });
    }
    return (
        <>
            <h4 className='customize-card-title'>Select your Type</h4>
            <div className='type-select-content' onClick={selectItem}>
                <div className='type-select-content-item' data-type="pomegranate & rose">
                    <img src={pomegrenate} alt="pomegrenate" data-type="pomegranate & rose" className={`${selectedType === "pomegranate & rose" && "active-customize-element"}`} />
                    <p data-type="pomegranate & rose">Pomegranate & Rose</p>
                </div>
                <div className='type-select-content-item' data-type="banana">
                    <img src={banana} alt="banana" data-type="banana" className={`${selectedType === "banana" && "active-customize-element"}`} />
                    <p data-type="banana">Banana</p>
                </div>
                <div className='type-select-content-item' data-type="orange & lime">
                    <img src={lime} alt="lime" data-type="orange & lime" className={`${selectedType === "orange & lime" && "active-customize-element"}`} />
                    <p data-type="orange & lime">Orange & Lime</p>
                </div>
                <div className='type-select-content-item' data-type="turmeric">
                    <img src={turmeric} alt="turmeric" data-type="turmeric" className={`${selectedType === "turmeric" && "active-customize-element"}`} />
                    <p data-type="turmeric">Turmeric</p>
                </div>
                <div className='type-select-content-item' data-type="aloevera">
                    <img src={aloevera} alt="aloevera" data-type="aloevera" className={`${selectedType === "aloevera" && "active-customize-element"}`} />
                    <p data-type="aloevera">Aloevera</p>
                </div>
                <div className='type-select-content-item' data-type="whey">
                    <img src={whey} alt="whey" data-type="whey" className={`${selectedType === "whey" && "active-customize-element"}`} />
                    <p data-type="whey">Whey</p>
                </div>
            </div>
        </>
    )
}

export default TypeSelect;
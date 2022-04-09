import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { customizedOrderActions } from '../../../redux/actions/customizedOrderAction';
import aquamarine from "../../../images/customize/aquamarine.jpg";
import floral from "../../../images/customize/floral.jpg";
import berry from "../../../images/customize/berry.jpg";
import oriental from "../../../images/customize/oriental.jpg";
import woody from "../../../images/customize/woody.jpg";

function FragranceSelect() {
    const selectedFragrance = useSelector((state) => state.customizedOrder.fragrance);
    const dispatch = useDispatch();
    const selectItem = (event) => {
        const selectedItem = event.target.attributes.getNamedItem("data-fragrance").value;
        dispatch({
            type: customizedOrderActions.UPDATE_FRAGRANCE_DATA,
            payload: selectedItem,
        });
    }
    return (
        <>
            <h4 className='customize-card-title'>Select your Fragrance</h4>
            <div className='fragrance-select-content' onClick={selectItem}>
                <div className='fragrance-select-content-item' data-fragrance="aqua marine">
                    <img src={aquamarine} alt="aquamarine" className={`${selectedFragrance === "aqua marine" && "active-customize-element"}`} data-fragrance="aqua marine" />
                    <p data-fragrance="aqua marine">Aqua Marine</p>
                </div>
                <div className='fragrance-select-content-item' data-fragrance="floral">
                    <img src={floral} alt="floral" className={`${selectedFragrance === "floral" && "active-customize-element"}`} data-fragrance="floral" />
                    <p data-fragrance="floral">Floral</p>
                </div>
                <div className='fragrance-select-content-item' data-fragrance="berry">
                    <img src={berry} alt="berry" className={`${selectedFragrance === "berry" && "active-customize-element"}`} data-fragrance="berry" />
                    <p data-fragrance="berry">
                        Berry
                    </p>
                </div>
                <div className='fragrance-select-content-item' data-fragrance="oriental">
                    <img src={oriental} alt="oriental" className={`${selectedFragrance === "oriental" && "active-customize-element"}`} data-fragrance="oriental" />
                    <p data-fragrance="oriental">Oriental</p>
                </div>
                <div className='fragrance-select-content-item' data-fragrance="woody">
                    <img src={woody} alt="woody" className={`${selectedFragrance === "woody" && "active-customize-element"}`} data-fragrance="woody" />
                    <p data-fragrance="woody">Woody</p>
                </div>
            </div>
        </>
    )
}

export default FragranceSelect;
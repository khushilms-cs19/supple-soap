import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { customizedOrderActions } from '../../../redux/actions/customizedOrderAction';
import cinnamon from "../../../images/customize/cinnamon.jpg";
import clove from "../../../images/customize/clove.jpg";
import basil from "../../../images/customize/basil.jpg";
import lavender from "../../../images/customize/lavender.jpg";
import rose from "../../../images/customize/rose.jpg";
import berryoil from "../../../images/customize/berryoil.jpg";

function EssentialOilSelect() {
    const selectedEssentialOil = useSelector((state) => state.customizedOrder.essentialOil);
    const dispatch = useDispatch();
    const selectItem = (event) => {
        const selectedItem = event.target.attributes.getNamedItem("data-essential-oil").value;
        dispatch({
            type: customizedOrderActions.UPDATE_ESSENTIAL_OIL_DATA,
            payload: selectedItem,
        });
    }
    return (
        <>
            <h4 className='customize-card-title'>Select your Essential</h4>
            <div className='essential-oil-select-content' onClick={selectItem}>
                <div className='essential-oil-select-content-item' data-essential-oil="cinnamon oil">
                    <img src={cinnamon} alt="cinnamon" className={`${selectedEssentialOil === "cinnamon oil" && "active-customize-element"}`} data-essential-oil="cinnamon oil" />
                    <p data-essential-oil="cinnamon oil">Cinnamon Oil</p>
                </div>
                <div className='essential-oil-select-content-item' data-essential-oil="floral oil">
                    <img src={clove} alt="clove" className={`${selectedEssentialOil === "floral oil" && "active-customize-element"}`} data-essential-oil="floral oil" />
                    <p data-essential-oil="floral oil">Floral Oil</p>
                </div>
                <div className='essential-oil-select-content-item' data-essential-oil="basil oil">
                    <img src={basil} alt="basil" className={`${selectedEssentialOil === "basil oil" && "active-customize-element"}`} data-essential-oil="basil oil" />
                    <p data-essential-oil="basil oil">Basil Oil</p>
                </div>
                <div className='essential-oil-select-content-item' data-essential-oil="lavender oil">
                    <img src={lavender} alt="lavender" className={`${selectedEssentialOil === "lavender oil" && "active-customize-element"}`} data-essential-oil="lavender oil" />
                    <p data-essential-oil="lavender oil">Lavender Oil</p>
                </div>
                <div className='essential-oil-select-content-item' data-essential-oil="rose oil">
                    <img src={rose} alt="rose" className={`${selectedEssentialOil === "rose oil" && "active-customize-element"}`} data-essential-oil="rose oil" />
                    <p data-essential-oil="rose oil">Rose Oil</p>
                </div>
                <div className='essential-oil-select-content-item' data-essential-oil="berry oil">
                    <img src={berryoil} alt="berryoil" className={`${selectedEssentialOil === "berry oil" && "active-customize-element"}`} data-essential-oil="berry oil" />
                    <p data-essential-oil="berry oil">Berry Oil</p>
                </div>
            </div>
        </>
    )
}

export default EssentialOilSelect;
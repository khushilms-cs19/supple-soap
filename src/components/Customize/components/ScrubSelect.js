import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { customizedOrderActions } from "../../../redux/actions/customizedOrderAction.js"
import coffee from "../../../images/customize/coffee.jpg";
import honey from "../../../images/customize/honey.png";
import apricot from "../../../images/customize/apricot.jpg";
import almond from "../../../images/customize/almond.jpg";
import walnut from "../../../images/customize/walnut.jpg";
import charcoal from "../../../images/customize/charcoal.jpg";

function ScrubSelect() {
    const selectedScrub = useSelector((state) => state.customizedOrder.scrub);
    const dispatch = useDispatch();
    const selectItem = (event) => {
        const selectedItem = event.target.attributes.getNamedItem("data-scrub").value;
        dispatch({
            type: customizedOrderActions.UPDATE_SCRUB_DATA,
            payload: selectedItem,
        });
    }
    return (
        <React.Fragment>
            <h4 className='customize-card-title'>Select your Scrub</h4>
            <div className='scrub-select-content' onClick={selectItem}>
                <div className='scrub-select-content-item' data-scrub="coffee">
                    <img src={coffee} alt="coffee" data-scrub="coffee" className={`${selectedScrub === "coffee" && "active-customize-element"}`} />
                    <p data-scrub="coffee">Coffee</p>
                </div>
                <div className='scrub-select-content-item' data-scrub="honey & sugar">
                    <img src={honey} alt="honey" data-scrub="honey & sugar" className={`${selectedScrub === "honey & sugar" && "active-customize-element"}`} />
                    <p data-scrub="honey & sugar">Honey & Sugar</p>
                </div>
                <div className='scrub-select-content-item' data-scrub="apricot">
                    <img src={apricot} alt="apricot" data-scrub="apricot" className={`${selectedScrub === "apricot" && "active-customize-element"}`} />
                    <p data-scrub="apricot">Apricot</p>
                </div>
                <div className='scrub-select-content-item' data-scrub="almond">
                    <img src={almond} alt="almond" data-scrub="almond" className={`${selectedScrub === "almond" && "active-customize-element"}`} />
                    <p data-scrub="almond">Almond</p>
                </div>
                <div className='scrub-select-content-item' data-scrub="walnut">
                    <img src={walnut} alt="walnut" data-scrub="walnut" className={`${selectedScrub === "walnut" && "active-customize-element"}`} />
                    <p data-scrub="walnut">Walnut</p>
                </div>
                <div className='scrub-select-content-item' data-scrub="charcoal">
                    <img src={charcoal} alt="charcoal" data-scrub="charcoal" className={`${selectedScrub === "charcoal" && "active-customize-element"}`} />
                    <p data-scrub="charcoal">Charcoal</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ScrubSelect;
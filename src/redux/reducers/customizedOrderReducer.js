import { customizedOrderActions } from "../actions/customizedOrderAction";
const initialState = {
    base: "shea butter",
    scrub: "coffee",
    type: "banana",
    fragrance: "aqua marine",
    essentialOil: "cinnamon oil",
    quantity: 1,
}

const customizedOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case customizedOrderActions.UPDATE_BASE_DATA:
            return {
                ...state,
                base: action.payload,
            }
        case customizedOrderActions.UPDATE_SCRUB_DATA:
            return {
                ...state,
                scrub: action.payload,
            }
        case customizedOrderActions.UPDATE_TYPE_DATA:
            return {
                ...state,
                type: action.payload,
            }
        case customizedOrderActions.UPDATE_FRAGRANCE_DATA:
            return {
                ...state,
                fragrance: action.payload,
            }
        case customizedOrderActions.UPDATE_ESSENTIAL_OIL_DATA:
            return {
                ...state,
                essentialOil: action.payload,
            }
        case customizedOrderActions.UPDATE_ALL_DATA:
            return {
                ...action.payload,
            }
        case customizedOrderActions.UPDATE_QUANTITY:
            return {
                ...state,
                quantity: action.payload,
            }
        case customizedOrderActions.CLEAR_CART_DATA:
            return {
                ...initialState,
            }
        default: return state;
    }
}

export default customizedOrderReducer;
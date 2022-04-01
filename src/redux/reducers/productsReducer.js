import { productsConstants } from "../actions/productsActions";
const initialState = {
    products: [],
}
const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case productsConstants.PRODUCTS_UPDATE_DATA:
            return {
                products: [...action.payload]
            }
        default: return state;
    }
}

export default productsReducer;
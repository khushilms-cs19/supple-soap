import { userConstants } from "../actions/userActions";
const initialState = {
    name: "",
    email: "",
    password: "",
    address: "",
    phoneno: "",
    token: "",
    cart: {
        regularProducts: [],
        customizedProducts: [],
    },
    orders: [],
    isAuthenticated: false,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.USER_UPDATE_ALL_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case userConstants.UPDATE_USER_ORDERS:
            return {
                ...state,
                orders: action.payload,
            }
        case userConstants.UPDATE_CART_DATA:
            return {
                ...state,
                cart: action.payload,
            }
        case userConstants.UPDATE_USER_AUTHENTICATION_STATUS:
            return {
                ...state,
                isAuthenticated: action.payload,
            }
        case userConstants.USER_CLEAR_DATA:
            return {
                ...initialState,
            }
        case userConstants.USER_CLEAR_CUSTOMIZED_PRODUCTS:
            return {
                ...state,
                cart: {
                    regularProducts: state.cart.regularProducts,
                    customizedProducts: initialState.cart.customizedProducts,
                }
            }
        case userConstants.USER_CLEAR_REGULAR_PRODUCTS:
            return {
                ...state,
                cart: {
                    regularProducts: initialState.cart.customizedProducts,
                    customizedProducts: state.cart.customizedProducts,
                }
            }
        default: return state;
    }
}

export default userReducer;
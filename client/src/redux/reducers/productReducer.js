import { PRODUCT_ERROR, PRODUCT_LIST_ERROR, PRODUCT_LIST_LOADING, PRODUCT_LIST_SUCCESS, PRODUCT_LOADING, PRODUCT_SUCCESS, RESET_PRODUCT_LIST_STATE, RESET_PRODUCT_STATE } from "../types";

export function productReducer(state = {}, action) {
    switch(action.type) {
        case PRODUCT_LOADING:
            return {
                loading: true
            }

        case PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }

        case PRODUCT_ERROR:
            return {
                loading: false,
                error: action.payload
            }

        case RESET_PRODUCT_STATE:
            return {}

        default: 
            return state
    }
}

export function productListReducer(state = {}, action) {
    switch(action.type) {
        case PRODUCT_LIST_LOADING:
            return {
                loading: true
            }

        case PRODUCT_LIST_SUCCESS:
            return {
                productList: action.payload.products,
                totalPages: action.payload.totalPages,
                loading: false
            }

        case PRODUCT_LIST_ERROR:
            return {
                error: action.payload,
                loading: false
            }

        case RESET_PRODUCT_LIST_STATE:
            return {}

        default:
            return state
    }
}
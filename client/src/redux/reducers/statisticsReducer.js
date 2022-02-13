import { PRODUCT_BY_SALES_ERROR, PRODUCT_BY_SALES_LOADING, PRODUCT_BY_SALES_SUCCESS, RESET_PRODUCT_BY_SALES_STATE, RESET_STATISTICAL_INFO_STATE, STATISTICAL_INFO_ERROR, STATISTICAL_INFO_LOADING, STATISTICAL_INFO_SUCCESS } from "../types";

export function statisticalInfoReducer(state = {}, action) {
    switch(action.type) {
        case STATISTICAL_INFO_LOADING:
            return {
                loading: true
            }

        case STATISTICAL_INFO_SUCCESS:
            return {
                stats: action.payload,
                loading: false
            }

        case STATISTICAL_INFO_ERROR:
            return {
                error: action.payload,
                loading: false
            }

        case RESET_STATISTICAL_INFO_STATE:
            return {}

        default:
            return state
    }
}

export function productbySalesReducer(state = {}, action) {
    switch(action.type) {
        case PRODUCT_BY_SALES_LOADING:
            return {
                loading: true
            }

        case PRODUCT_BY_SALES_SUCCESS:
            return {
                productListWithSales: action.payload,
                loading: false
            }

        case PRODUCT_BY_SALES_ERROR:
            return {
                error: action.payload,
                loading: false
            }

        case RESET_PRODUCT_BY_SALES_STATE:
            return {}

        default:
            return state
    }
}
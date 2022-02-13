import { CUSTOMER_ERROR, CUSTOMER_LIST_ERROR, CUSTOMER_LIST_LOADING, CUSTOMER_LIST_SUCCESS, CUSTOMER_LOADING, CUSTOMER_SUCCESS, RESET_CUSTOMER_LIST_STATE, RESET_CUSTOMER_STATE } from "../types";

export function customerReducer(state = {}, action){
    switch(action.type) {
        case CUSTOMER_LOADING:
            return {
                loading: true
            }

        case CUSTOMER_SUCCESS: 
            return {
                customer: action.payload,
                loading: false
            }

        case CUSTOMER_ERROR:
            return {
                error: action.payload,
                loading: false
            }

        case RESET_CUSTOMER_STATE:
            return {}

        default:
            return state
    }
}

export function customerListReducer(state = {}, action){
    switch(action.type) {
        case CUSTOMER_LIST_LOADING:
            return {
                loading: true
            }

        case CUSTOMER_LIST_SUCCESS: 
            return {
                customerList: action.payload.customers,
                totalPages: action.payload.totalPages,
                loading: false
            }

        case CUSTOMER_LIST_ERROR:
            return {
                error: action.payload,
                loading: false
            }

        case RESET_CUSTOMER_LIST_STATE:
            return {}

        default:
            return state
    }
}
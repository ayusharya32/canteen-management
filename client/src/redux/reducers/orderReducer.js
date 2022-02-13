import { ORDER_ERROR, ORDER_LIST_ERROR, ORDER_LIST_LOADING, ORDER_LIST_SUCCESS, ORDER_LOADING, ORDER_SUCCESS, RESET_ORDER_LIST_STATE, RESET_ORDER_STATE } from "../types";

export function orderReducer(state = {}, action) {
    switch(action.type) {
        case ORDER_LOADING:
            return {
                loading: true
            }

        case ORDER_SUCCESS:
            return {
                order: action.payload,
                loading: false
            }

        case ORDER_ERROR:
            return {
                error: action.payload,
                loading: false
            }

        case RESET_ORDER_STATE:
            return {}

        default:
            return state
    }
}

export function orderListReducer(state = {}, action) {
    switch(action.type) {
        case ORDER_LIST_LOADING:
            return {
                loading: true
            }

        case ORDER_LIST_SUCCESS:
            return {
                orderList: action.payload.orders,
                totalPages: action.payload.totalPages,
                loading: false
            }

        case ORDER_LIST_ERROR:
            return {
                error: action.payload,
                loading: false
            }

        case RESET_ORDER_LIST_STATE:
            return {}

        default:
            return state
    }
}
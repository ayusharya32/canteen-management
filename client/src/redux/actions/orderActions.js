import axios from "axios"
import { jsonContentTypeConfig } from "../../utils/AxiosUtils"
import { ORDER_ERROR, ORDER_LIST_ERROR, ORDER_LIST_LOADING, ORDER_LIST_SUCCESS, ORDER_LOADING, ORDER_SUCCESS, RESET_ORDER_STATE } from "../types"

/* ******************************* Order State ************************** */

export const createOrder = (requestBody) => async (dispatch) => {
    dispatch({ type: ORDER_LOADING })

    console.log(requestBody);

    try {
        const response = await axios.post("/api/order", requestBody, jsonContentTypeConfig)

        dispatch({ type: ORDER_SUCCESS, payload: response.data })
        console.log(response.data);
    } catch(err) {
        dispatch({ type: ORDER_ERROR, payload: err.response })
        console.log(err.response);
    }
}

export const getOrderById = (orderId) => async (dispatch) => {
    dispatch({ type: ORDER_LOADING })

    try {
        const response = await axios.get(`/api/order/${orderId}`)
        
        dispatch({ type: ORDER_SUCCESS, payload: response.data })
        console.log(response.data);
    } catch(err) {
        dispatch({ type: ORDER_ERROR, payload: err.response })
        console.log(err.response);
    }
}

export const payOrder = (orderId) => async (dispatch) => {
    dispatch({ type: ORDER_LOADING })

    try {
        const response = await axios.put(`/api/order/${orderId}/pay`)
        
        dispatch({ type: ORDER_SUCCESS, payload: response.data })
        console.log(response.data);
    } catch(err) {
        dispatch({ type: ORDER_ERROR, payload: err.response })
        console.log(err.response);
    }
}

export const resetOrderState = () => async (dispatch) => {
    dispatch({ type: RESET_ORDER_STATE })
}

/* ******************************* Order List State ************************** */

export const getOrders = (keyword = "", pageNumber = 1, orderType = "all") => async (dispatch) => {
    dispatch({ type: ORDER_LIST_LOADING })

    try {
        const response = await axios.get(`/api/order?keyword=${keyword}&pageNumber=${pageNumber}&orderType=${orderType}`)

        dispatch({ type: ORDER_LIST_SUCCESS, payload: response.data })
        console.log(response.data);
        
    } catch(err) {
        dispatch({ type: ORDER_LIST_ERROR, payload: err.response })
        console.log(err.response);
    }
}
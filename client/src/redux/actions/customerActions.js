import axios from "axios"
import { jsonContentTypeConfig } from "../../utils/AxiosUtils"
import { CUSTOMER_ERROR, CUSTOMER_LIST_ERROR, CUSTOMER_LIST_LOADING, CUSTOMER_LIST_SUCCESS, CUSTOMER_LOADING, CUSTOMER_SUCCESS, RESET_CUSTOMER_STATE } from "../types"

/* ******************************* Customer State ************************** */

export const addCustomer = (name, phone) => async (dispatch) => {
    dispatch({ type: CUSTOMER_LOADING })

    const requestBody = { name, phone }

    try {
        const response = await axios.post("/api/customer", requestBody, jsonContentTypeConfig)

        dispatch({ type: CUSTOMER_SUCCESS, payload: response.data })

        console.log(response.data);
    } catch(err) {
        dispatch({ type: CUSTOMER_ERROR, payload: err.response })
        console.log(err.response);
    }
}

export const getCustomerByIdOrPhone = (keyword) => async (dispatch) => {
    dispatch({ type: CUSTOMER_LOADING })

    try {
        const response = await axios.get(`/api/customer/${keyword}`)

        dispatch({ type: CUSTOMER_SUCCESS, payload: response.data })

        console.log(response.data);
    } catch(err) {
        dispatch({ type: CUSTOMER_ERROR, payload: err.response })
        console.log(err.response);
    }
}

export const resetCustomerState = () => async (dispatch) => {
    dispatch({ type: RESET_CUSTOMER_STATE })
}

/* ******************************* Customer List State ************************** */

export const getCustomers = (keyword = "", pageNumber = 1) => async (dispatch) => {
    dispatch({ type: CUSTOMER_LIST_LOADING })

    try {
        const response = await axios.get(`/api/customer?keyword=${keyword}&pageNumber=${pageNumber}`)

        dispatch({ type: CUSTOMER_LIST_SUCCESS, payload: response.data })
        console.log(response.data);
        
    } catch(err) {
        dispatch({ type: CUSTOMER_LIST_ERROR, payload: err.response })
        console.log(err.response);
    }
} 

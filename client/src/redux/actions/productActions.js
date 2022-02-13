import axios from "axios"
import { jsonContentTypeConfig } from "../../utils/AxiosUtils"
import { PRODUCT_ERROR, PRODUCT_LIST_ERROR, PRODUCT_LIST_LOADING, PRODUCT_LIST_SUCCESS, PRODUCT_LOADING, PRODUCT_SUCCESS, RESET_PRODUCT_LIST_STATE, RESET_PRODUCT_STATE } from "../types"

/* ******************************* Product State ************************** */

export const addProduct = (name, price) => async (dispatch) => {
    dispatch({ type: PRODUCT_LOADING })

    const requestBody = { name, price }

    try {
        const response = await axios.post("/api/product", requestBody, jsonContentTypeConfig)

        dispatch({ type: PRODUCT_SUCCESS, payload: response.data })

        console.log(response.data);
    } catch(err) {
        dispatch({ type: PRODUCT_ERROR, payload: err.response })
        console.log(err.response);
    }
}

export const resetProductState = () => async (dispatch) => {
    dispatch({ type: RESET_PRODUCT_STATE })
}

/* ******************************* Product List State ************************** */

export const getProductsWithPagination = (keyword = "", pageNumber = 1) => async (dispatch) => {
    dispatch({type: PRODUCT_LIST_LOADING })

    try {
        const response = await axios.get(`/api/product?keyword=${keyword}&pageNumber=${pageNumber}`)

        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: response.data })

        console.log(response.data);
    } catch(err) {
        dispatch({ type: PRODUCT_LIST_ERROR , payload: err.response })
        console.log(err.response);
    }
}

export const getAllProducts = (keyword = "") => async (dispatch) => {
    dispatch({type: PRODUCT_LIST_LOADING })

    try {
        const response = await axios.get(`/api/product?keyword=${keyword}&type=all`)

        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: response.data })

        console.log(response.data);
    } catch(err) {
        dispatch({ type: PRODUCT_LIST_ERROR , payload: err.response })
        console.log(err.response);
    }
}

export const resetProductListState = () => async (dispatch) => {
    dispatch({ type: RESET_PRODUCT_LIST_STATE })
}
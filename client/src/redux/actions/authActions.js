import { AUTH_LOADING, AUTH_ERROR, LOGIN_SUCCESS, RESET_CUSTOMER_STATE, RESET_CUSTOMER_LIST_STATE, RESET_PRODUCT_STATE, RESET_PRODUCT_LIST_STATE, RESET_ORDER_STATE, RESET_ORDER_LIST_STATE, RESET_PRODUCT_BY_SALES_STATE, RESET_STATISTICAL_INFO_STATE, LOGOUT } from "../types"
import axios from "axios"
import { jsonContentTypeConfig } from "../../utils/AxiosUtils"
import { KEY_AUTH_TOKEN } from "../../utils/Constants"

export const loginUser = (email, password) => async (dispatch) => {
    dispatch({ type: AUTH_LOADING })

    const requestBody = { email, password }

    try {
        const response = await axios.post("/api/auth/login", requestBody, jsonContentTypeConfig)

        localStorage.setItem(KEY_AUTH_TOKEN, response.data.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

        console.log(response.data);

        dispatch({ type: LOGIN_SUCCESS, payload: response.data })
    } catch(err) {
        dispatch({ type: AUTH_ERROR, payload: err.response })
        console.log(err.response);
    } 
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem(KEY_AUTH_TOKEN)
    delete axios.defaults.headers.common['Authorization']

    dispatch({ type: LOGOUT })

    dispatch({ type: RESET_CUSTOMER_STATE })
    dispatch({ type: RESET_CUSTOMER_LIST_STATE })
    dispatch({ type: RESET_PRODUCT_STATE })
    dispatch({ type: RESET_PRODUCT_LIST_STATE })
    dispatch({ type: RESET_ORDER_STATE })
    dispatch({ type: RESET_ORDER_LIST_STATE })
    dispatch({ type: RESET_PRODUCT_BY_SALES_STATE })
    dispatch({ type: RESET_STATISTICAL_INFO_STATE })
}
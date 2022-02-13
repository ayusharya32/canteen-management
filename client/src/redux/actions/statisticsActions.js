import axios from "axios"
import { PRODUCT_BY_SALES_ERROR, PRODUCT_BY_SALES_LOADING, PRODUCT_BY_SALES_SUCCESS, STATISTICAL_INFO_ERROR, STATISTICAL_INFO_LOADING, STATISTICAL_INFO_SUCCESS } from "../types"

export const getStatisticalInfo = () => async (dispatch) => {
    dispatch({ type: STATISTICAL_INFO_LOADING })

    try {
        const response = await axios.get("/api/statistics")

        dispatch({ type: STATISTICAL_INFO_SUCCESS, payload: response.data })
        console.log(response.data);

    } catch(err) {
        dispatch({ type: STATISTICAL_INFO_ERROR, payload: err.response })
        console.log(err.response);
    }
}

export const getSalesByProduct = () => async (dispatch) => {
    dispatch({ type: PRODUCT_BY_SALES_LOADING })

    try {
        const response = await axios.get("/api/statistics/product-sales")

        dispatch({ type: PRODUCT_BY_SALES_SUCCESS, payload: response.data })
        console.log(response.data);
        
    } catch(err) {
        dispatch({ type: PRODUCT_BY_SALES_ERROR, payload: err.response })
        console.log(err.response);
    }
}
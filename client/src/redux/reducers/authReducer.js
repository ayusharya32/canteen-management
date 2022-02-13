import { KEY_AUTH_TOKEN } from "../../utils/Constants";
import { AUTH_ERROR, AUTH_LOADING, LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS } from "../types";

const initialAuthState = {
    token: localStorage.getItem(KEY_AUTH_TOKEN),
    isAuthenticated: localStorage.getItem(KEY_AUTH_TOKEN) && true
}

export function authReducer(state = initialAuthState, action) {
    switch(action.type) {
        case AUTH_LOADING: 
            return {
                loading: true
            }

        case LOGIN_SUCCESS:
            return {
                token: action.payload.token,
                isAuthenticated: true,
                loading: false
            }

        case LOGOUT: 
            return {
                isAuthenticated: false
            }


        case AUTH_ERROR: 
            return {
                loading: false,
                error: action.payload
            }

        default: 
            return state 
    }
}
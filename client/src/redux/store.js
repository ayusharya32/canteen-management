import { combineReducers, applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { authReducer } from "./reducers/authReducer"
import { customerListReducer, customerReducer } from "./reducers/customerReducer"
import { productListReducer, productReducer } from "./reducers/productReducer"
import { orderListReducer, orderReducer } from "./reducers/orderReducer"
import { productbySalesReducer, statisticalInfoReducer } from "./reducers/statisticsReducer"

const reducer = combineReducers({
    authState: authReducer,
    customerState: customerReducer,
    productState: productReducer,
    orderState: orderReducer,
    productListState: productListReducer,
    customerListState: customerListReducer,
    orderListState: orderListReducer,
    statisticalInfoState: statisticalInfoReducer,
    productBySalesState: productbySalesReducer
})

const initialState = {}

const middleware = [thunk]

const store  = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store

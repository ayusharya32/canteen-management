import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import { getCustomerByIdOrPhone, resetCustomerState } from "../redux/actions/customerActions";
import { createOrder, resetOrderState } from "../redux/actions/orderActions";
import { getAllProducts } from "../redux/actions/productActions";
import { ALERT_ERROR } from "../utils/Constants"

function CreateOrder() {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const customerState = useSelector(state => state.customerState)
    const { loading: customerLoading, error: customerError, customer } = customerState

    const orderState = useSelector(state => state.orderState)
    const { loading: orderLoading, error: orderError, order } = orderState

    const productListState = useSelector(state => state.productListState)
    const { loading: productListLoading, error: productListError, productList } = productListState

    const [customerPhone, setCustomerPhone] = useState("")
    const [product, setProduct] = useState("")
    const [quantity, setQuantity] = useState("")
    const [paid, setPaid] = useState(false)
    const [orderItems, setOrderItems] = useState([])

    const [validationError, setValidationError] = useState("")

    const subTotal = orderItems.reduce((acc, item) => {
        return acc + (item.product.price * item.quantity)
    }, 0)

    function onVerifyButtonClicked() {
        setValidationError("")
        dispatch(resetCustomerState())
        
        if(customerPhone.toString().length !== 10) {
            setValidationError("Invalid Phone Number")
            return
        }
        
        dispatch(getCustomerByIdOrPhone(customerPhone))
    }
    
    function onAddItemButtonClicked() {
        setValidationError("")

        if(quantity < 0 || quantity > 500) {
            setValidationError("Invalid product quantity")
            return
        }
 
        setOrderItems(prev => {
            const updatedOrderItems = [ ...prev, { product: JSON.parse(product), quantity: parseInt(quantity) }]
            
            console.log(updatedOrderItems);
            setProduct("-1")
            setQuantity("")

            return updatedOrderItems
        })
    }
    
    function onCreateOrderFormSubmitted(e) {
        e.preventDefault()

        if(customerPhone.toString().length !== 10 || customer == null) {
            setValidationError("Invalid Phone Number")
            return
        }

        if(orderItems.length === 0) {
            setValidationError("Please add items for order")
            return 
        }

        const requestOrderItems = orderItems.map(item => {
            return {
                product: item.product._id,
                quantity: parseInt(item.quantity)
            }
        })

        const requestBody = {
            customerId: customer._id,
            orderItems: requestOrderItems,
            isPaid: paid
        }

        console.log(requestBody);
        dispatch(createOrder(requestBody))
    } 

    function handleCustomerPhoneInput(e) {
        if(customer) {
            dispatch(resetCustomerState())
        }
        setCustomerPhone(e.target.value)
    } 

    function onOrderItemCloseButtonClicked(productId) {
        setOrderItems(prev => {
            const updatedItems = prev.filter(item => {
                return item.product._id !== productId
            })
            return updatedItems
        })
    }
    
    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(resetOrderState())
        dispatch(resetCustomerState())
    }, [])

    useEffect(() => {
        if(order) {
            navigate(`/orders/${order._id}`)
        }

        return () => {
            dispatch(resetOrderState())
        }
    }, [order])
    
    const productOptionsMarkup = productList && Array.isArray(productList) && productList.map(productOption => {
        const isProductSelected = orderItems && orderItems.find(item => item.product._id === productOption._id)
        return !isProductSelected && (
            <option key={productOption._id} value={JSON.stringify(productOption)}>{productOption.name}</option>
        )
    })

    const orderItemsMarkup = orderItems.map((item, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.product.name}</td>
                <td>{item.product.price}</td>
                <td>{item.quantity}</td>
                <td>{item.product.price * item.quantity}</td>
                <td>
                    <button 
                        onClick={() => onOrderItemCloseButtonClicked(item.product._id)}
                        type="button" 
                        className="btn-close">
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <section className="create-order">
            <div className="container my-3 px-3">
                <div className="col-lg-6 mx-auto">
                    <h3 className="mb-3 fs-1">Create Order</h3>
                    {(customerLoading || productListLoading || orderLoading) && <Loader /> }
                    {customerError && <Alert alertType={ALERT_ERROR} message={customerError.data.message} />}
                    {orderError && <Alert alertType={ALERT_ERROR} message={orderError.data.message} />}
                    {productListError && <Alert alertType={ALERT_ERROR} message={productListError.data.message} />}
                    {validationError && <Alert alertType={ALERT_ERROR} message={validationError} />}

                    <form onSubmit={onCreateOrderFormSubmitted}>
                        <div className="mb-3">
                            <label htmlFor="customerPhone" className="form-label">Customer Phone</label>
                            <div className="row">
                                <div className="col-sm-10">
                                    <input 
                                        onChange={handleCustomerPhoneInput}
                                        value={customerPhone}
                                        type="number" 
                                        className="form-control" 
                                        id="customerPhone" 
                                    /> 
                                </div>
                                <div className="col-sm-2">
                                    <div className="d-grid gap-2">
                                        <button
                                            onClick={onVerifyButtonClicked}
                                            disabled={customerLoading || orderLoading || productListLoading || 
                                                customerPhone === ""} 
                                            className="btn btn-primary">
                                                Verify
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="customerName" className="form-label">Customer Name</label>
                            <input 
                                value={customer ? customer.name : ""}
                                className="form-control" 
                                type="text" 
                                disabled 
                                readOnly 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Order Items</label>
                            <div className="row">
                                <div className="col-sm-6 mb-3">
                                    <select 
                                        onChange={(e) => setProduct(e.target.value)}
                                        className="form-select">
                                            <option value="-1" defaultChecked>Product Name</option>
                                            {productOptionsMarkup}
                                    </select>
                                </div>
                                <div className="col-sm-3 mb-3">
                                    <input
                                        onChange={(e) => setQuantity(e.target.value)}
                                        value={quantity} 
                                        className="form-control" 
                                        type="number" 
                                        placeholder="Qty"
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <div className="d-grid gap-2">
                                        <button 
                                            onClick={onAddItemButtonClicked}
                                            disabled={customerLoading || orderLoading || productListLoading || 
                                                (product === "-1" || quantity === "")} 
                                            className="btn btn-primary">
                                                Add Item
                                        </button>
                                    </div>
                                </div>
                            </div>
                            { orderItems && orderItems.length !== 0 && 
                                <div className="order-items">
                                    <table className="table table-striped mt-3">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Product Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { orderItemsMarkup }
                                        </tbody>
                                    </table>
                                    <p className="text-end text-primary">Sub Total (excluding taxes): <span className="fw-bold">₹{subTotal}</span></p>
                                </div>
                            }
                        </div>
                        <div className="mb-3 form-check">
                            <input 
                                onChange={() => setPaid(prev => !prev)}
                                checked={paid}
                                type="checkbox" 
                                className="form-check-input" 
                                id="paidCheck" 
                            />
                            <label className="form-check-label" htmlFor="paidCheck">Paid</label>
                        </div>
                        <button 
                            disabled={customerLoading || orderLoading || productListLoading} 
                            type="submit" 
                            className="btn btn-primary">
                                Submit
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default CreateOrder;

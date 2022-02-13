import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import { getOrderById, payOrder, resetOrderState } from "../redux/actions/orderActions";
import { ALERT_ERROR } from "../utils/Constants";
import html2pdf from "html2pdf.js"

function OrderDetails() {
    const urlParams = useParams()

    const dispatch = useDispatch()
    const orderState = useSelector(state => state.orderState)
    const { loading, error, order } = orderState
    
    function onPayButtonClicked() {
        if(order) {
            dispatch(payOrder(order._id))
        }
    }

    function onSavePdfButtonClicked() {
        const pdfContainer = document.querySelector("section.order-details .container .pdf-container")

        console.log(pdfContainer);

        var opt = {
            margin: 1,
            filename: `${order && order.customer.name}-${order && order._id}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().from(pdfContainer).set(opt).save();
    }

    useEffect(() => {
        dispatch(getOrderById(urlParams.orderId))
        
        return () => {
            dispatch(resetOrderState())
        }
    }, [])
    
    const orderItemsMarkup = order && order.orderItems && order.orderItems.map((item, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.product.name}</td>
                <td>{item.product.price}</td>
                <td>{item.quantity}</td>
                <td>{item.product.price * item.quantity}</td>
            </tr>
        )
    })
    
    return (
        <section className="order-details">
            <div className="container col-9">
                { loading && <Loader />}
                { error && <Alert alertType={ALERT_ERROR} message={error.data.message} />}

                <div className="pdf-container">
                    <h2 className="mt-3">Order Details</h2>
                    <div className="order-info">
                        <h4 className="my-3">Customer Information</h4>
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <td>Customer Name:</td>
                                    <td>{order && order.customer && order.customer.name}</td>
                                </tr>
                                <tr>
                                    <td>Customer Phone:</td>
                                    <td>{order && order.customer && order.customer.phone}</td>
                                </tr>
                                <tr>
                                    <td>Sub Total:</td>
                                    <td>₹{order && (order.totalPrice - order.taxPrice)}</td>
                                </tr>
                                <tr>
                                    <td>Tax:</td>
                                    <td>₹{order && order.taxPrice}</td>
                                </tr>
                                <tr>
                                    <td>Order Total:</td> 
                                    <td>₹{order && order.totalPrice}</td>
                                </tr>
                                <tr>
                                    <td>Payment Status:</td>
                                    {order && (
                                        <td className={`fw-bold text-${order.isPaid ? "success" : "danger"}`}>
                                            {order && order.isPaid ? "Paid" : "Not Paid"}
                                        </td>
                                    )}
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="items-info">
                        <h4 className="mt-5 mb-1">Items</h4>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>{orderItemsMarkup}</tbody> 
                        </table>
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-center mt-3">
                    <button onClick={onSavePdfButtonClicked} className="btn btn-primary">Save PDF</button>
                    {order && !order.isPaid && 
                        <button className="btn btn-success ms-2" onClick={onPayButtonClicked}>
                            Pay
                        </button>
                    }
                </div>
            </div>
        </section>
    );
}

export default OrderDetails;

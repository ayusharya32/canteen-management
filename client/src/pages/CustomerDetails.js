import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import OrderItem from "../components/OrderItem";
import { getCustomerByIdOrPhone, resetCustomerState } from "../redux/actions/customerActions";
import { ALERT_ERROR } from "../utils/Constants";

function CustomerDetails() {
    const urlParams = useParams()

    const dispatch = useDispatch()
    const customerState = useSelector(state => state.customerState)

    const { loading, error, customer } = customerState

    const amountDue = (customer && customer.orders) && customer.orders.reduce((acc, order) => {
        return order.isPaid ? acc : acc + order.totalPrice
    }, 0)

    useEffect(() => {
        dispatch(getCustomerByIdOrPhone(urlParams.customerId))

        return () => {
            dispatch(resetCustomerState())
        }
    }, [])

    return (
        <section className="customer-details">
            <div className="container col-sm-9 col-xl-6 mt-3">
                { loading && <Loader />}
                { error && <Alert alertType={ALERT_ERROR} message={error.data.message} />}

                <h3 className="mb-3">Customer Information</h3>
                <table className="table">
                    <tbody>
                        <tr>
                            <td>Customer Name:</td>
                            <td>{customer && customer.name}</td>
                        </tr>
                        <tr>
                            <td>Customer Phone:</td>
                            <td>{customer && customer.phone}</td>
                        </tr>
                        <tr>
                            <td>Amount Due:</td>
                            <td>{amountDue}</td>
                        </tr>
                    </tbody>
                </table>

                <h3 className="my-3">Orders</h3>
                { (customer && customer.orders && customer.orders.length === 0) &&
                    <h4 className="text-center">No Orders</h4>
                }
                { (customer && customer.orders) &&
                    customer.orders.map(order => <OrderItem key={order._id} order={order} />)        
                }
            </div>
        </section>
    );
}

export default CustomerDetails;

import { useNavigate } from "react-router-dom";

function CustomerItem({ customer }) {
    const navigate = useNavigate()

    const amountDue = customer.orders && customer.orders.reduce((acc, order) => {
        return order.isPaid ? acc : acc + order.totalPrice
    }, 0)

    function onCustomerItemClicked() {
        navigate(`/customers/${customer._id}`)
    }

    return (
        <div className="customer-item card mb-3" onClick={onCustomerItemClicked}>
            <div className="container card-body">
                <div className="row">
                    <div className="col-md-6">
                        <p>Customer Name: <span className="text-success">{customer.name}</span></p>
                    </div>
                    <div className="col-md-6">
                        <p>Customer Phone: <span className="text-success">{customer.phone}</span></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <p>Total Orders: <span className="text-success">{customer.orders && customer.orders.length}</span></p>
                    </div>
                    <div className="col-md-6">
                        <p>Amount Due: <span className="text-danger">{amountDue}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerItem;

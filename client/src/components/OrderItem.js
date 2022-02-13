import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"

function OrderItem({ order }) {
    const navigate = useNavigate()

    const items = order.orderItems.map(item => {
        return item.product.name 
    }).join(", ")

    function onOrderItemClicked() {
        navigate(`/orders/${order._id}`)
    }

    return (
        <div className="order card mb-3" onClick={onOrderItemClicked}>
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-6">
                        <p>Order Id: {order._id}</p>
                    </div>
                    <div className="col-sm-6">
                        <p className="text-end">Total: ₹{order.totalPrice}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-9">
                        <p>Ordered By: {order.customer.name}</p>
                    </div>
                    <div className="col-3">
                        <p className={`text-${order.isPaid ? "success" : "danger"} text-end fw-bold`}>
                            {order.isPaid ? "Paid" : "Not Paid"}
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-7">
                        <p>Items: {items}</p>
                    </div>
                    <div className="col-5">
                        <p className="text-end text-secondary">{dayjs(order.createdAt).format("MMM DD, YYYY hh:mm:ss A")}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderItem;

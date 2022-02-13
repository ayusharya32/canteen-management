import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Alert from '../components/Alert';
import Loader from '../components/Loader';
import { getOrders } from '../redux/actions/orderActions';
import { ALERT_ERROR } from '../utils/Constants';
import OrderItem from '../components/OrderItem'

function Orders() {
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()
    const pageNumber = parseInt(searchParams.get("pageNumber")) || 1
    const keyword = searchParams.get("keyword") || ""

    const dispatch = useDispatch()

    const orderListState = useSelector(state => state.orderListState)
    const { loading, error, orderList, totalPages } = orderListState

    const [searchText, setSearchText] = useState(keyword)
    const [orderType, setOrderType] = useState("all")

    function onOrderSearchFormSubmitted(e) {
        e.preventDefault()

        if(searchText === "") {
            navigate("/orders")
            return
        }

        navigate(`/orders?keyword=${searchText}`)
    }

    useEffect(() => {
        dispatch(getOrders(keyword, pageNumber, orderType))
    }, [keyword, pageNumber, orderType])

    const pagesMarkup = totalPages && Array.from(Array(totalPages).keys(), x => x + 1).map(page => {
        console.log(`Page: ${typeof page}`);
        console.log(`Page Number: ${typeof pageNumber}`);
        return (
            <li key={page} className={`page-item ${(page === pageNumber) && "active"}`}>
                <Link 
                    className="page-link"
                    to={`/orders?keyword=${keyword}&pageNumber=${page}`}>
                        {page}
                </Link>
            </li>
        )
    })


    return (
        <section className="orders">
            <div className="container col-lg-7">
                {loading && <Loader />}
                {error && <Alert alertType={ALERT_ERROR} message={error.data.message} />}

                <div className="search-order my-3">
                    <p className="mb-1">Search Orders</p>
                    <form onSubmit={onOrderSearchFormSubmitted}>
                        <div className="row">
                            <div className="col-md-10 mb-3 mb-md-0">
                                <input 
                                    onChange={(e) => setSearchText(e.target.value)}
                                    value={searchText}
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Enter name, phone"
                                />
                            </div>
                            <div className="col-md-2 d-grid gap-2">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary">
                                        Search
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="col-sm-4 my-2">
                        <select
                            className="form-select"
                            onChange={(e) => setOrderType(e.target.value)}>
                            <option value="all" defaultChecked>All</option>
                            <option value="paid">Paid</option>
                            <option value="unpaid">Not Paid</option>
                        </select>
                    </div>
                </div>

                {(orderList && orderList.length === 0) && 
                    <h3 className="text-center">No Orders found</h3>
                }

                {orderList && orderList.map(order => {
                    return <OrderItem key={order._id} order={order} />
                })}

                {totalPages > 0 && 
                    <ul className="pagination">
                        <li className={`page-item ${pageNumber === 1 && "disabled"}`}>
                            <Link 
                                className="page-link" 
                                to={`/orders?keyword=${keyword}&pageNumber=${pageNumber - 1}`}>
                                    Previous
                            </Link>
                        </li>
                        {pagesMarkup}
                        <li className={`page-item ${pageNumber === totalPages && "disabled"}`}>
                            <Link 
                                className="page-link" 
                                to={`/orders?keyword=${keyword}&pageNumber=${pageNumber + 1}`}>
                                    Next
                            </Link>
                        </li>
                    </ul>
                }
            </div>
        </section>
    );
}

export default Orders;

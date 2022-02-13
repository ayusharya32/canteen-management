import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Alert from "../components/Alert";
import CustomerItem from "../components/CustomerItem";
import Loader from "../components/Loader";
import { getCustomers } from "../redux/actions/customerActions";
import { ALERT_ERROR } from "../utils/Constants";

function Customers() {
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()

    const pageNumber = parseInt(searchParams.get("pageNumber")) || 1
    const keyword = searchParams.get("keyword") || ""

    const dispatch = useDispatch()

    const customerListState = useSelector(state => state.customerListState)
    const { loading, error, customerList, totalPages } = customerListState

    const [searchText, setSearchText] = useState(keyword)

    function onCustomerSearchFormSubmitted(e) {
        e.preventDefault()

        if(searchText === "") {
            navigate(`/customers`)
            return
        }

        navigate(`/customers?keyword=${searchText}`)
    }

    useEffect(() => {
        dispatch(getCustomers(keyword, pageNumber))
    }, [keyword, pageNumber])

    const pagesMarkup = totalPages && Array.from(Array(totalPages).keys(), x => x + 1).map(page => {
        console.log(`Page: ${typeof page}`);
        console.log(`Page Number: ${typeof pageNumber}`);
        return (
            <li key={page} className={`page-item ${(page === pageNumber) && "active"}`}>
                <Link 
                    className="page-link"
                    to={`/customers?keyword=${keyword}&pageNumber=${page}`}>
                        {page}
                </Link>
            </li>
        )
    })

    return (
        <section className="customers">
            <div className="container col-lg-7">
                {loading && <Loader />}
                {error && <Alert alertType={ALERT_ERROR} message={error.data.message} />}

                <div className="search-customer my-3">
                    <p className="mb-1">Search Customers</p>
                    <form onSubmit={onCustomerSearchFormSubmitted}>
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
                </div>

                {(customerList && customerList.length === 0) && 
                    <h3 className="text-center">No Customers found</h3>
                }

                {customerList && customerList.map(customer => {
                    return <CustomerItem key={customer._id} customer={customer} />
                })}

                {totalPages > 0 && 
                    <ul className="pagination">
                        <li className={`page-item ${pageNumber === 1 && "disabled"}`}>
                            <Link 
                                className="page-link" 
                                to={`/customers?keyword=${keyword}&pageNumber=${pageNumber - 1}`}>
                                    Previous
                            </Link>
                        </li>
                        {pagesMarkup}
                        <li className={`page-item ${pageNumber === totalPages && "disabled"}`}>
                            <Link 
                                className="page-link" 
                                to={`/customers?keyword=${keyword}&pageNumber=${pageNumber + 1}`}>
                                    Next
                            </Link>
                        </li>
                    </ul>
                }
            </div>
        </section>
    );
}

export default Customers;

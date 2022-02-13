import { ALERT_ERROR } from "../utils/Constants"
import { useDispatch, useSelector } from "react-redux";
import Alert from "../components/Alert";
import { useEffect, useState } from "react";
import { addCustomer } from "../redux/actions/customerActions";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function AddCustomer() {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const customerState = useSelector(state => state.customerState)

    const { loading, error, customer } = customerState

    const [customerName, setCustomerName] = useState("")
    const [customerPhone, setCustomerPhone] = useState("")

    const [validationError, setValidationError] = useState("")

    function onAddCustomerFormSubmitted(e) {
        e.preventDefault()
        setValidationError("") 

        if(customerPhone.toString().length !== 10) {
            setValidationError("Invalid Phone Number") 
            return
        }

        dispatch(addCustomer(customerName, customerPhone))
    }

    useEffect(() => {
        if(customer) {
            navigate(`/customers/${customer._id}`)
        }
    }, [customer])

    return (
        <section className="add-customer">    
            <div className="container mt-5">
                <div className="col-sm-9 col-lg-7 mx-auto border px-5 py-4">
                    <h3 className="mb-4 fs-2">Add Customer</h3>
                    { error && <Alert alertType={ALERT_ERROR} message={error.data.message} />}
                    { validationError && <Alert alertType={ALERT_ERROR} message={validationError} />}
                    { loading && <Loader />}

                    <form onSubmit={onAddCustomerFormSubmitted}>
                        <div className="mb-3">
                            <label htmlFor="customerName" className="form-label">Customer Name</label>
                            <input 
                                onChange={(e) => setCustomerName(e.target.value)}
                                value={customerName}
                                type="text" 
                                className="form-control" 
                                id="customerName" 
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="customerPhone" className="form-label">Customer Phone Number</label>
                            <input 
                                onChange={(e) => setCustomerPhone(e.target.value)}
                                value={customerPhone}
                                type="number" 
                                className="form-control" 
                                id="customerPhone" 
                                required
                            />
                        </div>
                        <button 
                            disabled={loading}
                            type="submit" 
                            className="btn btn-primary">
                            Add
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default AddCustomer;

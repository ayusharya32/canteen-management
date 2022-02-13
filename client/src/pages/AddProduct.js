import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import { addProduct, resetProductState } from "../redux/actions/productActions";
import { ALERT_ERROR } from "../utils/Constants";

function AddProduct() {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const productState = useSelector(state => state.productState)
    const { loading, error, product } = productState

    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState("")

    function onAddProductFormSubmitted(e) {
        e.preventDefault()

        dispatch(addProduct(productName, productPrice))
    }

    useEffect(() => {
        if(product) {
            navigate("/products")
        }

        return () => {
            dispatch(resetProductState())
        }
    }, [product])

    return (
        <section className="add-product">
            <div className="container mt-5">
                <div className="col-sm-9 col-lg-7 mx-auto border px-5 py-4">
                        <h3 className="mb-4 fs-2">Add Product</h3>
                        { error && <Alert alertType={ALERT_ERROR} message={error.data.message} />}
                        { loading && <Loader />}

                        <form onSubmit={onAddProductFormSubmitted}>
                            <div className="mb-3">
                                <label for="productName" className="form-label">Product Name</label>
                                <input 
                                    onChange={(e) => setProductName(e.target.value)}
                                    value={productName}
                                    type="text" 
                                    className="form-control" 
                                    id="productName"
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label for="productPrice" className="form-label">Product Price</label>
                                <input 
                                    onChange={(e) => setProductPrice(e.target.value)}
                                    value={productPrice}
                                    type="number" 
                                    className="form-control" 
                                    id="productPrice" 
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

export default AddProduct;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Alert from '../components/Alert';
import Loader from '../components/Loader';
import ProductItem from '../components/ProductItem';
import { getProductsWithPagination } from '../redux/actions/productActions';
import { ALERT_ERROR } from '../utils/Constants';

function Products() {
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()
    const pageNumber = parseInt(searchParams.get("pageNumber")) || 1
    const keyword = searchParams.get("keyword") || ""

    const dispatch = useDispatch()
    const productListState = useSelector(state => state.productListState)
    const { loading, error, productList, totalPages } = productListState

    const [searchText, setSearchText] = useState(keyword)

    function onProductSearchFormSubmitted(e) {
        e.preventDefault()

        if(searchText === "") {
            navigate("/products")
            return
        }

        navigate(`/products?keyword=${searchText}`)
    }

    useEffect(() => {
        dispatch(getProductsWithPagination(keyword, pageNumber))
    }, [keyword, pageNumber])

    const pagesMarkup = totalPages && Array.from(Array(totalPages).keys(), x => x + 1).map(page => {
        console.log(`Page: ${typeof page}`);
        console.log(`Page Number: ${typeof pageNumber}`);
        return (
            <li key={page} className={`page-item ${(page === pageNumber) && "active"}`}>
                <Link 
                    className="page-link"
                    to={`/products?keyword=${keyword}&pageNumber=${page}`}>
                        {page}
                </Link>
            </li>
        )
    })

    return (
        <section className="products">
            <div className="container col-lg-7">
                {loading && <Loader />}
                {error && <Alert alertType={ALERT_ERROR} message={error.data.message} />}

                <div className="search-product my-3">
                    <p className="mb-1">Search Products</p>
                    <form onSubmit={onProductSearchFormSubmitted}>
                        <div className="row">
                            <div className="col-md-10 mb-3 mb-md-0">
                                <input 
                                    onChange={(e) => setSearchText(e.target.value)}
                                    value={searchText}
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Enter product name"
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

                {(productList && productList.length === 0) && 
                    <h3 className="text-center">No Products found</h3>
                }

                {productList && productList.map(product => {
                    return <ProductItem key={product._id} product={product} />
                })}

                {totalPages > 0 && 
                    <ul className="pagination">
                        <li className={`page-item ${pageNumber === 1 && "disabled"}`}>
                            <Link 
                                className="page-link" 
                                to={`/products?keyword=${keyword}&pageNumber=${pageNumber - 1}`}>
                                    Previous
                            </Link>
                        </li>
                        {pagesMarkup}
                        <li className={`page-item ${pageNumber === totalPages && "disabled"}`}>
                            <Link 
                                className="page-link" 
                                to={`/products?keyword=${keyword}&pageNumber=${pageNumber + 1}`}>
                                    Next
                            </Link>
                        </li>
                    </ul>
                }
            </div>
        </section>
    );
}

export default Products;

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getSalesByProduct, getStatisticalInfo } from "../redux/actions/statisticsActions";
import { useDispatch, useSelector } from "react-redux";
import StatCard from "../components/StatCard";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import { ALERT_ERROR } from "../utils/Constants";
import BarChart from "../components/BarChart";

function Home() {
  const dispatch = useDispatch()

  const productBySalesState = useSelector(state => state.productBySalesState)
  const { loading: productBySalesLoading, error: productBySalesError, productListWithSales } = productBySalesState

  const statisticalInfoState = useSelector(state => state.statisticalInfoState)
  const { loading: statisticalInfoLoading, error: statisticalInfoError, stats } = statisticalInfoState

  const maxSalesProduct = productListWithSales && productListWithSales.reduce((prev, cur) => {
    return (prev.totalQuantitySold > cur.totalQuantitySold) ? prev : cur
  })

  const data = productListWithSales && productListWithSales.map(product => {
    return { x: product.name, y: product.totalQuantitySold }
  })

  useEffect(() => {
    dispatch(getSalesByProduct())
    dispatch(getStatisticalInfo())
  }, [dispatch])
  
  const statsWithTitleArray = (stats && maxSalesProduct) && [
    { title: "Orders Today", value: stats.ordersToday },
    { title: "Orders last week", value: stats.ordersLastWeek },
    { title: "Orders last month", value: stats.ordersLastMonth },
    { title: "Total Orders", value: stats.totalOrders },
    { title: "Total Customers", value: stats.totalCustomers },
    { title: "Total Products", value: stats.totalProducts },
    { title: "Best Selling Product", value: maxSalesProduct.name }
  ]

  const statCardsMarkup = statsWithTitleArray && statsWithTitleArray.map((card, index) => {
    return <StatCard key={index} title={card.title} value={card.value} />
  }) 

  return (
    <section className="home">
        <div className="container py-4">
            <div>
              <div className="row">
                <div className="col-sm-4 mb-2">
                  <div className="d-grid gap-2">
                    <Link to="/orders/add" className="btn btn-primary py-3 fw-light fs-5 px-4">Create Order</Link>
                  </div>
                </div>
                <div className="col-sm-4 mb-2">
                  <div className="d-grid gap-2">
                    <Link to="/customers/add" className="btn btn-primary py-3 fw-light fs-5 px-4">Add Customer</Link>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="d-grid gap-2">
                    <Link to="/products/add" className="btn btn-primary py-3 fw-light fs-5 px-4">Add Product</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="stat-cards mt-4">
              <div className="row">
                { (productBySalesLoading || statisticalInfoLoading) && <Loader /> }
                { productBySalesError && <Alert alertType={ALERT_ERROR} message={productBySalesError.data.message} /> }
                { statisticalInfoError && <Alert alertType={ALERT_ERROR} message={statisticalInfoError.data.message} /> }

                { statCardsMarkup }
              </div>
            </div>

            <div className="chart-container">
              {productListWithSales && <BarChart data={data} label="Quantity Sold" title="Product Sales" />}
            </div>
        </div>
    </section>
  );
}

export default Home;

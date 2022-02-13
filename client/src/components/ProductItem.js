function ProductItem({ product }) {
    return (
        <div className="product-item card mb-3">
            <div className="container card-body">
                <div className="row">
                    <div className="col-md-6">
                        <p>Product Name: <span className="text-success">{product.name}</span></p>
                    </div>
                    <div className="col-md-6">
                        <p className="text-end">Product Price: <span className="text-success">{product.price}</span></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <p>Total Quantity Sold: <span className="text-success">{product.totalQuantitySold}</span></p>
                    </div>
                    <div className="col-md-6">
                        <p className="text-end">Total Sales: <span className="text-success">{product.totalQuantitySold * product.price}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;

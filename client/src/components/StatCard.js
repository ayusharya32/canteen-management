function StatCard({ title, value }) {
    return (
        <div className="col-sm-3">
            <div className="card mb-3">
            <h5 className="card-header">{title}</h5>
            <div className="card-body">
                <h5 className="card-title">{value}</h5>
            </div>
            </div>
        </div>
    )
}

export default StatCard
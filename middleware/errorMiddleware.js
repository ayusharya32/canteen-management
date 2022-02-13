function errorHandler(err, req, res, next) {
    console.log(err);
    const statusCode = err.statusCode || (res.statusCode === 200 ? 400 : res.statusCode)

    res.status(statusCode).json({ message: err.message, errStatus: err.statusCode, resStatus: res.statusCode })
}

module.exports = { errorHandler }
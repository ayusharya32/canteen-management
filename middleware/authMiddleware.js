const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

const authenticateUser = asyncHandler(async function(req, res ,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) {
        throw(new ApiError(401, "Unauthorized: Access token required"))
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const user = await User.findOne({ _id: decodedToken.id }).select("-password")

    if(user == null) {
        throw(new ApiError(404, "No user found with given id"))
    }

    req.user = user
    next()
})

module.exports = { authenticateUser }
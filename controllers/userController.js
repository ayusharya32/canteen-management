const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

const registerUser = asyncHandler(async function(req, res) {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if(userExists) {
        throw(new ApiError(400, "Email Already Exists"))
    }

    const user = await User.create({ name, email, password })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" })

    res.status(201).json({ token })
})

const loginUser = asyncHandler(async function(req, res) {
    const { email, password } = req.body

    if(email === undefined || password === undefined) {
        throw(new ApiError(400, "Required Body Parameters (email, password) not provided"))
    }

    const user = await User.login(email, password)

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" })
    res.status(200).json({ token })
})

const getCurrentUser = asyncHandler(function(req, res) {
    res.status(200).json(req.user)
})

module.exports = { registerUser, loginUser, getCurrentUser }
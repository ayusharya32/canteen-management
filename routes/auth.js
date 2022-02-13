const express = require('express')
const { registerUser, loginUser, getCurrentUser } = require('../controllers/userController')
const { authenticateUser } = require('../middleware/authMiddleware')
const router = express.Router()

router
    .route("/register")
    .post(registerUser)

router
    .route("/login")
    .post(loginUser)

router
    .route("/user")
    .get(authenticateUser, getCurrentUser)

module.exports = router
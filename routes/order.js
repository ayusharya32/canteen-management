const express = require('express')
const { getOrderById, getOrders, createOrder, payOrder } = require('../controllers/orderController')
const { authenticateUser } = require('../middleware/authMiddleware')

const router = express.Router()

router
    .route("/")
    .post(authenticateUser, createOrder)

router
    .route("/")
    .get(authenticateUser, getOrders)

router
    .route("/:orderId")
    .get(authenticateUser, getOrderById)

router
    .route("/:orderId/pay")
    .put(authenticateUser, payOrder)

module.exports = router
const express = require('express')
const { getCustomers, createCustomer, deleteCustomer, getCustomer } = require('../controllers/customerController')
const { authenticateUser } = require('../middleware/authMiddleware')

const router = express.Router()

router
    .route("/")
    .post(authenticateUser, createCustomer)

router
    .route("/")
    .get(authenticateUser, getCustomers)

router
    .route("/:keyword")
    .get(authenticateUser, getCustomer)

router
    .route("/:customerId")
    .delete(authenticateUser, deleteCustomer)

module.exports = router
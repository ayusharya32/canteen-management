const express = require('express')
const { createProduct, getProducts } = require('../controllers/productController')
const { authenticateUser } = require('../middleware/authMiddleware')

const router = express.Router()

router
    .route("/")
    .post(authenticateUser, createProduct)

router
    .route("/")
    .get(authenticateUser, getProducts)

module.exports = router
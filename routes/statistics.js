const express = require('express')
const { getStatisticalInfo, getSalesByProduct } = require('../controllers/statisticsController')
const { authenticateUser } = require('../middleware/authMiddleware')

const router = express.Router()

router
    .route("/")
    .get(authenticateUser, getStatisticalInfo)

router
    .route("/product-sales")
    .get(authenticateUser, getSalesByProduct)

module.exports = router
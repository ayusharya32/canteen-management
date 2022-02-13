const Customer = require('../models/Customer')
const Order = require('../models/Order')
const Product = require('../models/Product')
const moment = require('moment')

const getStatisticalInfo = async (req, res) => {
    const lastWeekDate = moment().subtract(7, "days")
    const lastMonthDate = moment().subtract(1, "month")

    const today = moment().startOf("day")

    const totalOrders = await Order.countDocuments()
    const ordersLastWeek = await Order.find({ createdAt: { $gte: lastWeekDate }}).countDocuments()
    const ordersToday = await Order.find({ 
        createdAt: { $gte: today.toDate(), $lt: moment(today).endOf("day").toDate() }
    }).countDocuments()
    
    const ordersLastMonth = await Order.find({ createdAt: { $gte: lastMonthDate }}).countDocuments()
    
    const totalCustomers = await Customer.countDocuments()
    const totalProducts = await Product.countDocuments()

    res.status(200).json({ ordersLastWeek, ordersLastMonth, totalOrders, ordersToday, totalCustomers, totalProducts })
}

const getSalesByProduct = async (req, res) => {
    const products = await Product.find().sort("name")

    const response = await Promise.all(products.map(async (product) => {
        const productOrders = await Order.find().where("orderItems").elemMatch({ "product._id": product._id })

        const totalQuantitySold = productOrders.reduce((acc, order) => {
            const item = order.orderItems.find(orderItem => orderItem.product._id.toString() === product._id.toString())

            return acc + item.quantity
        }, 0)

        return { ...product._doc, totalQuantitySold }
    }))

    res.status(200).json(response)
}


module.exports = { getStatisticalInfo, getSalesByProduct }

const Order = require('../models/Order')
const Product = require('../models/Product')
const asyncHandler = require('express-async-handler')
const ApiError = require('../error/ApiError')
const Customer = require('../models/Customer')
const { isValidObjectId } = require('mongoose')
const req = require('express/lib/request')

const createOrder = asyncHandler(async function(req, res) {
    const { customerId, orderItems, isPaid } = req.body
    let totalPrice = 0, taxPrice = 0

    if(customerId === undefined || orderItems === undefined || isPaid === undefined) {
        throw(new ApiError(400, "Required body parameters (customerId, orderItems, isPaid) not provided"))
    }

    if(!Array.isArray(orderItems) || orderItems.length === 0) {
        throw(new ApiError(400, "No order item provided"))
    }

    const customer = await Customer.findOne({ _id: customerId }).select("-__v")

    if(customer == null) {
        throw(new ApiError(404, "Invalid Customer Id"))
    }

    const orderItemsPopulated = await Promise.all(orderItems.map(async (item) => {
        /* item -> Unpopulated Order Item*/

        const product = await Product.findOne({ _id: item.product }).select("-__v")
        if(product == null) {
            throw(new ApiError(404, "Invalid Order Item"))
        }

        totalPrice = totalPrice + (product.price * item.quantity)

        return { product, quantity: item.quantity }
    }))

    console.log(orderItemsPopulated);

    const order = new Order({
        customer,
        orderItems: orderItemsPopulated,
        totalPrice,
        taxPrice,
        isPaid
    })

    console.log(order);
    await order.validate()

    taxPrice = Math.round(totalPrice * 0.08)
    totalPrice = totalPrice + taxPrice

    order.taxPrice = taxPrice
    order.totalPrice = totalPrice

    console.log(order);
    await order.save()

    res.status(201).json(order)
})

const getOrders = asyncHandler(async function(req, res) {
    const pageSize = 4
    const pageNumber = req.query.pageNumber || 1

    const orderType = req.query.orderType === "paid" 
        ? { isPaid: true }
        : (req.query.orderType === "unpaid") 
            ? { isPaid: false }
            : {}

    const searchParams = req.query.keyword ? [
        { "customer.name": { $regex: req.query.keyword, $options: "i" } },
        { "customer.phone": { $regex: req.query.keyword, $options: "i" } }
    ] : [{}]

    console.log(searchParams);

    const skipDocuments = pageSize * (pageNumber - 1)
    const orders = await Order.find({ ...orderType }).or(searchParams).sort("-createdAt").skip(skipDocuments).limit(pageSize)

    const totalOrders = await Order.find({ ...orderType }).or(searchParams).countDocuments()

    console.log(`Total Orders: ${totalOrders}`);
    console.log(`Total Pages: ${(Math.ceil(totalOrders / pageSize))}`);

    const totalPages = Math.ceil(totalOrders / pageSize)

    res.status(200).json({ totalPages, orders })
})

const getOrderById = asyncHandler(async function(req, res) {
    const { orderId } = req.params

    if(!isValidObjectId(orderId)) {
        throw(new ApiError(400, "Invalid Order Id"))
    }

    const order = await Order.findOne({ _id: orderId })

    if(order == null) {
        throw(new ApiError(404, "No order found with given order id"))
    }

    res.status(200).json(order)
})

const payOrder = asyncHandler(async function(req, res) {
    const { orderId } = req.params

    if(!isValidObjectId(orderId)) {
        throw(new ApiError(400, "Invalid Order Id"))
    }

    const order = await Order.findOne({ _id: orderId })

    if(order == null) {
        throw(new ApiError(404, "No order found with given order id"))
    }

    order.isPaid = true

    await order.save()

    res.status(200).json(order)
})

module.exports = { createOrder, getOrders, getOrderById, payOrder }
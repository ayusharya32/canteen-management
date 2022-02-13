const asyncHandler = require('express-async-handler')
const Customer = require('../models/Customer')
const Order = require('../models/Order')
const ApiError = require('../error/ApiError')
const { isValidObjectId } = require('mongoose')

const createCustomer = asyncHandler(async function(req, res) {
    const { name, phone } = req.body

    const customerExists = await Customer.findOne({ phone })

    if(customerExists) {
        throw(new ApiError(400, "Customer already exists"))
    }

    const customer = await Customer.create({ name, phone })
    res.status(201).json({ ...customer._doc, orders: [] })
})

const getCustomers = asyncHandler(async function(req, res) {
    const pageSize = 4
    const pageNumber = parseInt(req.query.pageNumber) || 1

    const searchParams = req.query.keyword ? [
        {name: { $regex: req.query.keyword, $options: "i" }},
        {phone: { $regex: req.query.keyword, $options: "i" }}
    ] : [{}]

    const skipDocuments = (pageNumber - 1) * pageSize
    const customers = await Customer.find().or(searchParams).sort("name").skip(skipDocuments).limit(pageSize)

    const response = await Promise.all(customers.map(async customer => {
        const customerOrders = await Order.find({ "customer._id": customer._id }).sort("-createdAt")

        return { ...customer._doc, orders: customerOrders }
    }))

    const totalCustomers = await Customer.find().or(searchParams).countDocuments()

    console.log(`Total Customers: ${totalCustomers}`);
    console.log(`Total Pages: ${(Math.ceil(totalCustomers / pageSize))}`);

    const totalPages = Math.ceil(totalCustomers / pageSize)

    res.status(200).json({ totalPages, customers: response })
})

const getCustomer = asyncHandler(async function(req, res) {
    const { keyword } = req.params

    const searchParams = isValidObjectId(keyword) ? {
        _id: keyword
    } : {
        phone: keyword
    }

    const customer = await Customer.findOne(searchParams)

    if(customer == null) {
        throw(new ApiError(404, "Customer with matching details not found"))
    }

    const customerOrders = await Order.find({ "customer._id": customer._id }).sort("-createdAt")

    res.status(200).json({ ...customer._doc, orders: customerOrders })
})

const deleteCustomer = asyncHandler(async function(req, res) {
    const { customerId } = req.params

    if(!isValidObjectId(customerId)) {
        throw(new ApiError(400, "Invalid Id"))
    }

    const customer = await Customer.findOne({ _id: customerId })

    if(customer == null) {
        throw(new ApiError(404, "No customer found with given id"))
    }

    await Customer.deleteOne({ _id: customerId })
    const customerOrders = await Order.find({ "customer._id": customer._id }).sort("-createdAt")

    res.status(200).json({ ...customer._doc, orders: customerOrders })
})

module.exports = { createCustomer, getCustomers, getCustomer, deleteCustomer }
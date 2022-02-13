const asyncHandler = require('express-async-handler')
const Product = require('../models/Product')
const ApiError = require('../error/ApiError')
const Order = require('../models/Order')

const createProduct = asyncHandler(async function(req, res) {
    const { name, price } = req.body

    const productExists = await Product.findOne({ name })

    if(productExists) {
        throw(new ApiError(400, "Product with the same name already exists"))
    }

    const product = await Product.create({ name, price })
    res.status(201).json(product)
})

const getProducts = asyncHandler(async function(req, res) {
    const pageSize = 4
    const pageNumber = req.query.pageNumber || 1

    const searchParams = req.query.keyword ? {
        name: { $regex: req.query.keyword, $options: "i" }
    } : {}

    const skipDocuments = (pageNumber - 1) * pageSize

    const products = req.query.type === "all" 
        ? await Product.find({ ...searchParams }).sort("name")
        : await Product.find({ ...searchParams }).sort("name").skip(skipDocuments).limit(pageSize)

    const response = await Promise.all(products.map(async (product) => {
        const productOrders = await Order.find().where("orderItems").elemMatch({ "product._id": product._id })

        const totalQuantitySold = productOrders.reduce((acc, order) => {
            const item = order.orderItems.find(orderItem => orderItem.product._id.toString() === product._id.toString())
            console.log(item);
            return acc + item.quantity 
        }, 0)

        console.log(totalQuantitySold);

        return { ...product._doc, totalQuantitySold }
    }))

    const totalProducts = await Product.find({ ...searchParams }).countDocuments()

    console.log(`Total Products: ${totalProducts}`);
    console.log(`Total Pages: ${req.query.type !== "all" ? Math.ceil(totalProducts / pageSize) : 1}`);

    const totalPages = req.query.type !== "all" ? Math.ceil(totalProducts / pageSize) : 1

    res.status(200).json({ totalPages, products: response })
}) 

module.exports = { createProduct, getProducts }

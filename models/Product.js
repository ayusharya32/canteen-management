const mongoose = require('mongoose')
const { validatePrice } = require('../utils/validators')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        minlength: [4, "Product name should contain at least 2 characters"],
        maxlength: [30, "Product name should not be greater than 30 characters"],
        required: [true, "Please add product name"]
    },
    price: {
        type: Number,
        validate: [validatePrice, "Please add a valid price for product"],
        required: [true, "Please add price for product"]
    }
})

module.exports = mongoose.model("Product", ProductSchema)
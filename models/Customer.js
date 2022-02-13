const mongoose = require('mongoose')
const { validateName, validatePhone } = require('../utils/validators') 

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: [4, "Name should contain at least 4 characters"],
        maxlength: [30, "Name should not be greater than 30 characters"],
        validate: [validateName, "Please enter a valid name"],
        required: [true, "Please add a name"]
    },
    phone: {
        type: String,
        validate: [validatePhone, "Please enter a valid phone number"],
        unique: true,
        required: [true, "Please add phone number"]
    }
})

module.exports = mongoose.model("Customer", CustomerSchema)
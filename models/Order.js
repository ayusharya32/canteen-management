const mongoose = require('mongoose')
const { validateQuantity, validateName, validatePhone, validatePrice } = require('../utils/validators')

const OrderSchema = new mongoose.Schema({
    customer: {
        _id: {
            type: mongoose.SchemaTypes.ObjectId
        },
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
            required: [true, "Please add phone number"]
        }
    },
    orderItems: [{
        _id: false,
        product: {
            _id: {
                type: mongoose.SchemaTypes.ObjectId
            },
            name: {
                type: String,
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
        },
        quantity: {
            type: Number,
            validate: [validateQuantity, "Please add valid quantity for product"],
            default: 1
        }
    }],
    totalPrice: {
        type: Number,
        default: 0,
        required: [true, "Please add total price for order"]
    },
    taxPrice: {
        type: Number,
        default: 0,
        required: [true, "Please add tax price for order"]
    },
    isPaid: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true })

module.exports = mongoose.model("Order", OrderSchema)
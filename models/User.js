const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')
const { validateName, validatePassword } = require('../utils/validators') 
const ApiError = require('../error/ApiError')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: [4, "Name should contain at least 4 characters"],
        maxlength: [30, "Name should not be greater than 30 characters"],
        validate: [validateName, "Please enter a valid name"],
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        validate: [isEmail, "Please enter a valid email"],
        required: [true, "Please add an email"]
    },
    password: {
		type: String,
		trim: true,
		minlength: [6, "Password should have at least 6 characters"],
		validate: [validatePassword, "Password should have at least one lowercase, one uppercase and a special character"],
		required: [true, "Please add a password"]
	}
})


/* this -> Current User Object */
UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

/* this -> User Model */
UserSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email: email })

    if(user) {
        const authResult = await bcrypt.compare(password, user.password)

        if(authResult) {
            return user
        } else {
            throw(new ApiError(401, "Incorrect Password"))
        }
    } else {
        throw(new ApiError(401, "Email not found"))
    }
}

module.exports = mongoose.model("User", UserSchema)
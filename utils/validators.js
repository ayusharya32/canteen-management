const mongoose = require('mongoose')

function validateName(name) {
	const regex = /^[a-zA-Z ]*$/
	return regex.test(name)
}

function validatePassword(password) {
	const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/
	return regex.test(password)
}

function validatePhone(phoneNumber) {
    const regex = /^\d{10}$/
    return regex.test(phoneNumber.toString())
}

function validatePrice(price) {
	return price > 0 && price < 1000
}

function validateQuantity(qty) {
	return qty > 0 && qty <= 500
}

module.exports = { validateName, validatePassword, validatePhone, validatePrice, validateQuantity }
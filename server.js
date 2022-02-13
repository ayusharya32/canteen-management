const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { errorHandler } = require('./middleware/errorMiddleware')
const authRoute = require('./routes/auth')
const customerRoute = require('./routes/customer')
const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')
const statisticsRoute = require('./routes/statistics')
const path = require('path')

dotenv.config({ path: './config/config.env' })
const app = express()

/* Adding Body Parser Middleware */
app.use(express.json())

/* Routes */
app.use("/api/auth", authRoute)
app.use("/api/customer", customerRoute)
app.use("/api/product", productRoute)
app.use("/api/order", orderRoute)
app.use("/api/statistics", statisticsRoute)

/* Adding Error Handler */
app.use(errorHandler)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")))

    app.get("*", function(req, res) {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
} else {
    app.get("/", function(req, res) {
        res.send("API is running...")
    })
}

connectDbAndServer()

async function connectDbAndServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
        console.log("MongoDB connected")

        const PORT = process.env.PORT || 5000
        app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))
    } catch(err) {
        console.log("Error connecting Database:" + err)
    }
}
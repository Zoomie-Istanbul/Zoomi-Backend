require('dotenv').config()
const cors = require("cors")
const express = require('express')
const router = require('./routes/index')
const errHandler = require('./helpers/errHandler.js')
const port = process.env.PORT || 3000
const app = express()
const io = require('socket.io')(http);
global.io = io; 
app.use(cors())
app.use(express.urlencoded({extended: true, limit: "15360mb",}))
app.use(express.json())


app.use('/', router)

app.use(errHandler)

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})
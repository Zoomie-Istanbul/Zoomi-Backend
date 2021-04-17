require('dotenv').config()
const cors = require("cors")
const express = require('express')
const router = require('./routes/index')
const errHandler = require('./helpers/errHandler.js')
const port = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use('/', router)

app.use(errHandler)


module.exports = app
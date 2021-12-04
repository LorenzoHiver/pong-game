const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
app.use(cors())
app.options('*', cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


require('./server/routes')(app)

module.exports = app

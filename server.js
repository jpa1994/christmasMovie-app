// Build server
const express = require('express')
const server = express()
const router = require('./routes/router')
const PORT = process.env.PORT || 3001

// Handle security
const helmet = require('helmet')
const cors = require('cors')

// Configuring helmet, Handle security
// server.use(helmst())
server.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    crossOriginResourcePolicy: false,
    crossOriginResourcePolicy: false,
    directives: {
        "img-src": ["'self'", "https: data"],
        "scriptSrc": ["'self'", "cdn.jsdelivr.net"]

    }
}))

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true}))

// Using ejs as my view engine
server.set('view engine', 'ejs')

// localhost:3001
server.use('/', router)

server.listen(PORT, ()=> console.log`The weather is finally cold.`)
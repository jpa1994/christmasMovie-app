const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3001

// Home Page => http://localhost:3001
router.get('/', (req,res)=> {
    res.render('pages/home', {
        title: 'christmas-movie-app home',
        name: "John's Christmas Movie App"
    })
})

// Root Route => http://localhost:3001/api
router.get('/api', (req,res)=> {
    res.json({
        'All Programs': `http://localhost:${PORT}/api/program`
    })
})

const endpoints = [
    'program'
]

endpoints.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`))
})

// Error handling
router.use((req, res, next)=> {
    res.status(404)
    .send('<h1>404 Error: This page does not exist.</h1>')
    // .render('pages/error', {
    //     title: 'Error Page',
    //     name: 'Error'
    // })
})

module.exports = router
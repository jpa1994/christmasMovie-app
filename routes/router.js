const express = require('express')
const router = express.Router()
const axios = require('axios')
const { paginationResults, buildProgramArr } = require('../helpers/pagination')
const PORT = process.env.PORT || 3001

// Home Page => http://localhost:3001
router.get('/', (req,res)=> {
            res.render('pages/home', {
                title: "John's Christmas Program App",
                name: "john's christmas program app"
            })
})

// Program
router.get('/program', (req, res)=> {
    const url = 'http://localhost:3001/api/program'
    const pageData = paginationResults(req)
    let programArr = []

    axios.get(url)
        .then(resp => {
            const programArrData = buildProgramArr(resp.data, programArr, pageData.startIdx, pageData.endIdx, pageData.page)

            //console.log(programArrData)
            res.render('pages/program', {
                title: "program",
                name: "All Programs",
                data: programArrData.arr,
                prev: programArrData.prev,
                next: programArrData.next,
                endpoint: "program"
            })
        })
})

// Actor
router.get('/actor', (req, res)=> {
    const url = 'http://localhost:3001/api/actor'
    const pageData = paginationResults(req)
    let programArr = []

    axios.get(url)
        .then(resp => {
            const programArrData = buildProgramArr(resp.data, programArr, pageData.startIdx, pageData.endIdx, pageData.page)

            //console.log(programArrData)
            res.render('pages/actor', {
                title: "actor",
                name: "All Actors",
                data: programArrData.arr,
                prev: programArrData.prev,
                next: programArrData.next,
                endpoint: "actor"
            })
        })
})

// Single program
router.get('program/:id', (req, res)=> {

    const id = parseInt(req.params.id, 10);

    // const id = req.params.id
    const url = `http://localhost:3001/api/program/${id}`

    // const pageData = paginationResults(req)
    //let programArr = []

    axios.get(url)
        .then(resp => {
            // const programArrData = buildProgramArr(resp.data, programArr, pageData.startIdx, pageData.endIdx, pageData.page)
            const program = resp.data
            // console.log(program)
            
            res.render('pages/singleProgram', {
                title: program.title,
                program: program,
                prev: program.program_id -1,
                next: program.program_id +1,
                id: program.program_id,
                endpoint: "program",
                name: "Single Program"
            })
        })
})

// Actor-Form => http://localhost:3001/actor-form
router.get('/actor-form', (req, res)=> {
    res.render('pages/actor-form', {
        title: 'actor form',
        name: 'actor-form'
    })
})

// Root Route => http://localhost:3001/api
router.get('/api', (req,res)=> {
    res.json({
        'All Programs': `http://localhost:${PORT}/api/program`,
        'All Producers': `http://localhost:${PORT}/api/producer`,
        'All Directors': `http://localhost:${PORT}/api/director`,
        'All Actors': `http://localhost:${PORT}/api/actor`,
        'All Streaming Platforms': `http://localhost:${PORT}/api/streaming_platform`
    })
})

const endpoints = [
    'program',
    'producer',
    'director',
    'actor',
    'streaming_platform'
]

endpoints.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`))
})

// Error handling
router.use((req, res, next)=> {
    res.status(404)
    //.send('<h1>404 Error: This page does not exist.</h1>')
    .render('pages/error', {
        title: 'Error Page',
        name: 'Error'
    })
})

module.exports = router
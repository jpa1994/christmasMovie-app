const router = require('express').Router()

const { programDao: dao} = require('../../daos/dao')

// http://localhost:3001/api/program
router.get('/', (req, res)=> {
    // dao.findAll(req, res, dao.table)
    dao.findProgramInfo(res, dao.table)
})

// http://localhost:3001/api/program/count
router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table, req.params.sorter)
})

// http://localhost:3001/api/program/sort/:sort
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

// http://localhost:3001/api/program/search
router.get('/search', (req, res)=> {
    dao.search(res, dao.table, req.params.sorter)
})

// http://localhost:3001/api/program/:id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router
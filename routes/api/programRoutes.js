const router = require('express').Router()
const { programDao: dao} = require('../../daos/dao')

// http://localhost:3001/api/program
router.get('/', (req, res)=> {
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

// http://localhost:3001/api/program/search/:column/:query
router.get('/search/:column/:query', (req, res) => {
    dao.search(res, dao.table, req.params.column, req.params.query);
})

// http://localhost:3001/api/program/get_program_rating/program_rating/TV-Y
router.get('/get_program_rating/program_rating/TV-Y', (req, res)=> {
    dao.findProgramRatingTV_Y(res, dao.table)
})

// http://localhost:3001/api/program/get_rating/5highestRatings
router.get('/get_rating/5highestRatings', (req, res)=> {
    dao.findFiveHighestRatings(res, dao.table)
})

// http://localhost:3001/api/program/:id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

// http://localhost:3001/api/program/create
router.post('/create', (req, res)=> {
    dao.create(req, res, dao.table)
})

// PATCH
router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

module.exports = router
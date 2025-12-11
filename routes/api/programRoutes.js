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

// http://localhost:3001/api/program/search/:column/:query
router.get('/search/:column/:query', (req, res) => {
    dao.search(res, dao.table, req.params.column, req.params.query);
})

// http://localhost:3001/api/program/findProgramRating
router.get('/get_program_rating/program_rating/TV-Y', (req, res)=> {
    dao.findProgramRatingTV_Y(res, dao.table)
})

// http://localhost:3001/api/program/5highestRatings
router.get('/get_rating/5highestRatings', (req, res)=> {
    dao.findFiveHighestRatings(res, dao.table)
})

// http://localhost:3001/api/program/:id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router
const router = require('express').Router()

const { directorDao: dao} = require('../../daos/dao')

// http://localhost:3001/api/director
router.get('/', (req, res)=> {
    // dao.findAll(req, res, dao.table)
    dao.findDirectorInfo(res, dao.table)
})

// http://localhost:3001/api/director/count
router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table, req.params.sorter)
})

// http://localhost:3001/api/director/sort/:sort
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

// http://localhost:3001/api/director/search/:column/:query
router.get('/search/:column/:query', (req, res) => {
    dao.search(res, dao.table, req.params.column, req.params.query);
})

// http://localhost:3001/api/director/lastNameFirstLetterM
router.get('/lastNameFirstLetterM', (req, res)=> {
    dao.findDirectorByLastNameFirstLetterM(res, dao.table, req.params.sorter)
})

// http://localhost:3001/api/director/countDirectorsWithMoreThanOneProgram
router.get('/countDirectorsWithMoreThanOneProgram', (req, res)=> {
    dao.countDirectorsWithMoreThanOneProgram(res, dao.table, req.params.sorter)
})

// http://localhost:3001/api/director/:id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

// http://localhost:3001/api/director/create
router.post('/create', (req, res)=> {
    dao.create(req, res, dao.table)
})

// PATCH
router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

module.exports = router
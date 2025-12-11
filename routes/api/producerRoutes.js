const router = require('express').Router()

const { producerDao: dao} = require('../../daos/dao')

// http://localhost:3001/api/producer
router.get('/', (req, res)=> {
    // dao.findAll(req, res, dao.table)
    dao.findProducerInfo(res, dao.table)
})

// http://localhost:3001/api/producer/count
router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table, req.params.sorter)
})

// http://localhost:3001/api/producer/sort/:sort
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

// http://localhost:3001/api/producer/search/:column/:query
router.get('/search/:column/:query', (req, res) => {
    dao.search(res, dao.table, req.params.column, req.params.query);
})

// http://localhost:3001/api/producer/firstNameFirstLetterB
router.get('/firstNameFirstLetterB', (req, res)=> {
    dao.findProducerByFirstNameFirstLetterB(res, dao.table, req.params.sorter)
})  

// http://localhost:3001/api/producer/:id/findProgramsByProducer
router.get('/:id/findProgramsByProducer', (req, res)=> {
    dao.findProgramsByProducer(res, dao.table, req.params.id)
}) 

// http://localhost:3001/api/producer/:id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router
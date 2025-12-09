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

// http://localhost:3001/api/producer/:id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router
const router = require('express').Router()

const { actorDao: dao} = require('../../daos/dao')

// http://localhost:3001/api/actor
router.get('/', (req, res)=> {
    // dao.findAll(req, res, dao.table)
    dao.findActorInfo(res, dao.table)
})

// http://localhost:3001/api/actor/count
router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table, req.params.sorter)
})

// http://localhost:3001/api/actor/sort/:sort
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

// http://localhost:3001/api/actor/search/:column/:query
router.get('/search/:column/:query', (req, res) => {
    dao.search(res, dao.table, req.params.column, req.params.query);
})

// http://localhost:3001/api/actor/findActorByFirstNameLastLetterY
router.get('/findActorByFirstNameLastLetterY', (req, res)=> {
    dao.findActorByFirstNameLastLetterY(res, dao.table, req.params.sorter)
})

// http://localhost:3001/api/actor/findActorByLastNameLastLetterE
router.get('/findActorByLastNameLastLetterE', (req, res)=> {
    dao.findActorByLastNameLastLetterE(res, dao.table, req.params.sorter)
})

// http://localhost:3001/api/actor/:id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

// http://localhost:3001/api/actor/create
router.post('/create', (req, res)=> {
    dao.create(req, res, dao.table)
})

// PATCH
router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

module.exports = router
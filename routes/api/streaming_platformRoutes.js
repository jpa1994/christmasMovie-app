const router = require('express').Router()

const { streamingPlatformDao: dao} = require('../../daos/dao')

// http://localhost:3001/api/streaming_platform
router.get('/', (req, res)=> {
    // dao.findAll(req, res, dao.table)
    dao.findStreamingPlatformInfo(res, dao.table)
})

// http://localhost:3001/api/streaming_platform/count
router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table, req.params.sorter)
})

// http://localhost:3001/api/streaming_platform/sort/:sort
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

// http://localhost:3001/api/streaming_platform/search/:column/:query
router.get('/search/:column/:query', (req, res) => {
    dao.search(res, dao.table, req.params.column, req.params.query);
})

// http://localhost:3001/api/streaming_platform/streaming_platform_count
router.get('/streaming_platform_count', (req, res)=> {
    dao.findStreamingPlatformCount(res, dao.table, req.params.sorter)
})

// http://localhost:3001/api/streaming_platform/findProgramsByStreamingPlatform
router.get('/:id/findProgramsByStreamingPlatform', (req, res)=> {
    dao.findProgramsByStreamingPlatform(res, dao.table, req.params.id)
})

// http://localhost:3001/api/streaming_platform/:id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router
const daoCommon = require('./common/daoCommon')

const programDao= {
    ...daoCommon,
    ...require('./api/programDao')
}

const producerDao= {
    ...daoCommon,
    ...require('./api/producerDao')
}

const directorDao= {
    ...daoCommon,
    ...require('./api/directorDao')
}

const actorDao= {
    ...daoCommon,
    ...require('./api/actorDao')
}

const streamingPlatformDao= {
    ...daoCommon,
    ...require('./api/streamingPlatformDao')
}

module.exports = {
    programDao,
    producerDao,
    directorDao,
    actorDao,
    streamingPlatformDao
}
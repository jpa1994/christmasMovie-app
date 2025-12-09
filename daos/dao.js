const daoCommon = require('./common/daoCommon')

const programDao= {
    ...daoCommon,
    ...require('./api/programDao')
}

const producerDao= {
    ...daoCommon,
    ...require('./api/producerDao')
}

module.exports = {
    programDao,
    producerDao
}
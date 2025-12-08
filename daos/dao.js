const daoCommon = require('./common/daoCommon')

const programDao= {
    ...daoCommon,
    ...require('./api/programDao')
}

module.exports = {
    programDao
}
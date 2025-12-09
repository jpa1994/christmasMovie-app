const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const producerDao = {

    table: 'producer',

    findProducerInfo: (res, table)=> {

        const sql = `SELECT pr.producer_id, pr.first_name, pr.last_name
        FROM producer pr;`

        con.query(
            sql,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    }
}

module.exports = producerDao
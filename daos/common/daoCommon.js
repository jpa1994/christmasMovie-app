const connect = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const daoCommon = {
    // create methods that will query the databases
    findAll: (req, res, table)=> {

        connect.query(
            `SELECT * FROM ${table};`,

            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    },

    findById: (res, table, id)=> {

        connect.query(
            `SELECT * FROM ${table} WHERE ${table}_id = ${id};`,

            (error, rows)=> {
                queryAction(res, error, rows, table)
            }

        )
    },

    countAll: (res, table)=> {
        connect.query(
            `SELECT COUNT(*) FROM ${table};`,

            (error, rows)=> {
                queryAction(res, error, rows, table)
            }

        )
    },

    search: (res, table, column, query) => {
    
    const safeQuery = query.replace(/'/g, "''"); // Replace apostrophes with double single quotes => developer.mozilla.org

    connect.query(
            `SELECT * FROM ${table} WHERE ${column} LIKE '%${safeQuery}%';`,

            (error, rows) => {
                queryAction(res, error, rows, table);
            }
        )

    },


    sort: (res, table, sorter)=> {

        connect.query(
            `SELECT * FROM ${table} ORDER BY ${sorter};`,

            (error, rows)=> {
                queryAction(res, error, rows, table)
            }

        )
    }
}

module.exports = daoCommon
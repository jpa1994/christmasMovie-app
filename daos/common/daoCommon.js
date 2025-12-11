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
    },

    create: (req, res, table)=> {

        // req.body => {}

        if(Object.keys(req.body).length === 0) {
            // Object.keys(obj) => array of keys
            res.json({
                "error": true,
                "message": "No fields to create"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            connect.execute(
                `INSERT INTO ${table} SET ${fields.join(' = ?, ')} = ?;`,
                values,
                (error, dbres)=> {
                    if (!error) {
                        console.log(dbres)
                        res.render('pages/success', {
                            title: 'Success',
                            name: 'Success'
                        })
                    } else {
                        console.log(`${table}Dao error:`, error)
                    }
                }
            )
        }
    },

    update: (req, res, table)=> {

        // check if id == number
        if (isNaN(req.params.id)) {
            res.json({
                "error": true,
                "message": "Id must be a number"
            })
        } else if (Object.keys(req.body).length == 0) {
            res.json({
                "error": true,
                "message": "No fields to update"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            connect.execute(
                `UPDATE ${table}
                    SET ${fields.join(' = ?, ')} = ? WHERE ${table}_id = ?;`,
                [...values, req.params.id],
                (error, dbres)=> {
                    if (!error) {
                        res.send(`Changed ${dbres.changedRows} row(s)`)
                    } else {
                        res.json({
                            "error": true,
                            "message": error
                        })
                    }
                }
            )
        }
    }
}

module.exports = daoCommon
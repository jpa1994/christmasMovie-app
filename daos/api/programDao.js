const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const programDao = {

    table: 'program',

    findProgramInfo: (res, table)=> {

        const sql = `SELECT p.program_id, p.title, p.yr_released, p.runtime, p.producer_id, p.format, p.program_rating, p.rating, p.img_url, p.description,
        CONCAT(pr.first_name, ' ', pr.last_name) AS producer_name
        FROM program AS p
        LEFT JOIN producer AS pr
        ON p.producer_id = pr.producer_id
        ORDER BY p.program_id;`

        con.query(
            sql,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    }
}

module.exports = programDao
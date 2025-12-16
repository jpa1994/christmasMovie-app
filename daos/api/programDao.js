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
    },

    // Find by TV-Y
    findProgramRatingTV_Y: (res, table)=> {
        const sql = `SELECT p.program_id, p.title, p.yr_released, p.runtime, p.producer_id, p.format, p.program_rating, p.rating, p.img_url,
            p.description,
            CONCAT(pr.first_name, ' ', pr.last_name) AS producer_name
        FROM program p
        LEFT JOIN producer pr
        ON p.producer_id = pr.producer_id
        WHERE p.program_rating = 'TV-Y';`

        con.query(
            sql,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    },

    // Five Hightest ratings
    findFiveHighestRatings: (res, table)=> {

        const sql = `SELECT p.program_id, p.title, p.rating, p.yr_released
        FROM program AS p
        ORDER BY p.rating DESC
        LIMIT 5;`

        con.query(
            sql,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    }
}

module.exports = programDao
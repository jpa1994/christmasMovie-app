const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const directorDao = {

    table: 'director',

    findDirectorInfo: (res, table)=> {

        const sql = `SELECT 
        dr.director_id,
        CASE 
            WHEN dr.first_name IS NULL THEN ''
            ELSE dr.first_name
        END first_name,
        CASE
            WHEN dr.last_name IS NULL THEN ''
            ELSE dr.last_name
        END last_name,
        p.title FROM director dr
        LEFT OUTER JOIN program_to_director ptp USING (director_id)
        LEFT OUTER JOIN program p USING (program_id)
        ORDER BY dr.director_id;`

        con.query(
            sql,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    },

    findDirectorByLastNameFirstLetterM: (res, table)=> {

        const sql = `SELECT dr.director_id, dr.first_name, dr.last_name FROM director dr
        WHERE last_name LIKE 'm%';`
    
        con.query(
            sql,
            (error, rows) => {
            queryAction(res, error, rows, table)
            }
        )
    },

    countDirectorsWithMoreThanOneProgram: (res, table)=> {

        const sql = `SELECT dr.director_id,
        CONCAT(dr.first_name, ' ', dr.last_name) AS director_name,
        COUNT(*) AS program_count
        FROM program_to_director pd
        JOIN director dr USING (director_id)
        GROUP BY dr.director_id, dr.first_name, dr.last_name
        HAVING COUNT(*) >= 2
        ORDER BY program_count DESC;`

        con.query(
            sql,
            (error, rows) => {
            queryAction(res, error, rows, table)
            }
        )
    }
}

module.exports = directorDao
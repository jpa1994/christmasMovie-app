const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const actorDao = {

    table: 'actor',

    findActorInfo: (res, table)=> {

        const sql = `SELECT 
        a.actor_id, a.img_url,
        CASE 
            WHEN a.first_name IS NULL THEN ''
            ELSE a.first_name
        END first_name,
        CASE
            WHEN a.last_name IS NULL THEN ''
            ELSE a.last_name
        END last_name,
        p.title FROM actor a
        LEFT OUTER JOIN program_to_actor ptp USING (actor_id)
        LEFT OUTER JOIN program p USING (program_id)
        ORDER BY a.actor_id;`

        con.query(
            sql,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    },

    findActorByFirstNameLastLetterY: (res, table)=> {

        const sql = `SELECT a.actor_id, a.first_name, a.last_name FROM actor a
        WHERE first_name LIKE '%y';`
    
        con.query(
            sql,
            (error, rows) => {
            queryAction(res, error, rows, table)
            }
        )
    },

    findActorByLastNameLastLetterE: (res, table)=> {

        const sql = `SELECT a.actor_id, a.first_name, a.last_name FROM actor a
        WHERE last_name LIKE '%E';`
    
        con.query(
            sql,
            (error, rows) => {
            queryAction(res, error, rows, table)
            }
        )
    }
}

module.exports = actorDao
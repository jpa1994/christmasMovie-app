const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const streamingPlatformDao = {

    table: 'streaming_platform',

    findStreamingPlatformInfo: (res, table)=> {

        const sql = `SELECT sp.streaming_platform_id, sp.streaming_platform FROM streaming_platform sp;`

        con.query(
            sql,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    },

    findStreamingPlatformProgramCount: (res, table)=> {

        const sql = `SELECT sp.streaming_platform_id, sp.streaming_platform,
        COUNT(pts.program_id) AS number_of_programs
        FROM streaming_platform sp
        LEFT JOIN program_to_streaming pts
        ON sp.streaming_platform_id = pts.streaming_platform_id
        GROUP BY sp.streaming_platform_id, sp.streaming_platform
        ORDER BY number_of_programs DESC;`

        con.query(
            sql,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    },

    findProgramsByStreamingPlatform: (res, table, id)=> {
        let programs = []

        let sql = `SELECT p.program_id, p.title, p.yr_released, p.runtime, p.producer_id, p.format, p.program_rating, p.rating, p.img_url, p.description
        FROM program p
        JOIN program_to_streaming pts USING (program_id)
        WHERE pts.streaming_platform_id = ${id};`

        // .execute(query, callback function)
        // .exectute(query, array, callback function)
        con.execute(
            sql,
            (error, rows)=> {
                if (!error) {
                    Object.values(rows).forEach(obj => {
                        programs.push(obj)
                    })
                    // console.log(programs) // test here
                    con.execute(
                        `SELECT * FROM ${table} WHERE ${table}_id = ${id};`,
                        (error, rows2)=> {
                            rows2.forEach(row => {
                                row.programs = programs
                            })
                            if (!error) {
                                res.json(...rows2)
                            } else {
                                console.log('DAO Error:', error)
                            }
                        }
                    )
                } else {
                    res.json({
                        message: 'error',
                        table: `${table}`,
                        error: error
                    })
                }
            }
        )
    }
}

module.exports = streamingPlatformDao
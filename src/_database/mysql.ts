import { config } from 'dotenv'
import * as mysql from 'mysql2/promise'
import * as log4js from 'log4js'

if (process.env.DB_HOST === undefined) {
    try {
        config()
    } catch (err) {
        console.error(err)
    }
}

const sqlLogger = log4js.getLogger('trace-sql')
const { DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD, DB_PORT, DB_SSL } = process.env
const createPool = async () => {
    const pool = await mysql.createPool({
        connectionLimit: 10,
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        port: +DB_PORT,
        ssl: DB_SSL === 'true' ? { rejectUnauthorized: false, } : undefined,
        debug: false
    })

    return pool
}

const createConnection = async () => {
    const connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        port: +DB_PORT,
        ssl: DB_SSL === 'true' ? { rejectUnauthorized: false, } : undefined,
        debug: false
    })
    connection.connect()
    return connection
}

const execute = async (query: string, params?: Array<string | number>) => {
    try {
        sqlLogger.trace(`${query.slice(0, 500)} | Params : ${JSON.stringify(params)}`)
        const client = await createConnection()
        const [rows, fields] = await client.execute(query, params)
        client.end()
        return { rows, fields }
    } catch (err) {
        sqlLogger.error(`Error on executed query : ${JSON.stringify(err)}`)
        return null
    }
}

export default { execute, createPool }  
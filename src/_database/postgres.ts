import { Client } from 'pg'
import { config } from 'dotenv'
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
const createConnection = async () => {
    const connection = new Client({
        host: DB_HOST,
        database: DB_DATABASE,
        user: DB_USER,
        password: DB_PASSWORD,
        port: +DB_PORT,
        connectionTimeoutMillis: 1000,
        ssl: DB_SSL === 'true' ? { rejectUnauthorized: false, } : undefined,
    })
    try {
        await connection.connect()
        connection.on('error', async err => {
            sqlLogger.error(`Connection pool error : ${JSON.stringify(err)}`)
        })
        return connection
    } catch (err) {
        connection.end()
        sqlLogger.error(`Error connecting to DB Server : ${JSON.stringify(err)}`)
        return null
    }
}

const execute = async (query: string, params?: Array<string | number>): Promise<any> => {
    try {
        sqlLogger.trace(`${query.slice(0, 500)} | Params : ${JSON.stringify(params)}`)
        const client = await createConnection()
        const result = await client.query(query, params)
        client.end()
        return result
    } catch (err) {
        sqlLogger.error(`Error on executed query : ${JSON.stringify(err)}`)
        return null
    }
}

export default { execute } 
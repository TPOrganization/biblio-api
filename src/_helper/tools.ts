import { promises } from 'fs'
import { join } from 'path'
import postgres from 'src/_database/postgres'
import mysql from 'src/_database/mysql'

export const getDBObject = (dbType: string): any => {
    let dbObject
    switch (dbType) {
        case 'postgres':
            dbObject = postgres
            break
        default: // mysql
            dbObject = mysql
            break
    }
    return dbObject
}

export const getDbProtectedStr = (dbType: string): any => {
    let str = '?'
    switch (dbType) {
        case 'postgres':
            str = '$1'
            break
    }
    return str
}

export const getProtectedDbData = (dbType: string, tableName: string): any => {
    switch (dbType) {
        case 'postgres':
            return `"${tableName}"`
        default:
            return `\`${tableName}\``
    }
}


export const asyncForEach = async (array, callback) => {
    if (!array || !array.length) return
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

export const fetchFiles = async (
    targetPath: string,
): Promise<Array<string>> => {
    const files = await promises.readdir(targetPath)
    const fetchedFiles = []

    for (const file of files) {
        try {
            const filepath = join(targetPath, file)
            const stats = await promises.lstat(filepath)

            if (stats.isFile()) {
                fetchedFiles.push(filepath)
            }

            if (stats.isDirectory()) {
                const childFiles = await promises.readdir(filepath)
                files.push(...childFiles.map((f) => join(file, f)))
            }
        } catch (err) {
            console.error(err)
        }
    }

    return fetchedFiles
}

export const fetchFolder = async (
    targetPath: string,
): Promise<Array<string>> => {
    const files = await promises.readdir(targetPath)
    const fetchedFolder = []

    for (const file of files) {
        try {
            const filepath = join(targetPath, file)
            const stats = await promises.lstat(filepath)

            if (stats.isDirectory()) {
                fetchedFolder.push(filepath)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return fetchedFolder
}

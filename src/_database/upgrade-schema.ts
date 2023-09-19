import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { LoggerService } from 'src/_helper/logger/logger.service'
import { asyncForEach, fetchFiles, fetchFolder, getDBObject, getProtectedDbData } from 'src/_helper/tools'
import { join } from 'path'
import * as fs from 'fs'

@Injectable()
export class UpgradeSchema {
    private schemaVersion: string
    private dataVersion: string
    constructor(
        private configService: ConfigService,
        private loggerService: LoggerService
    ) { }

    async processUpgradeSchema() {
        const setupTable = this.configService.get<string>('DB_SETUP_TABLE')
        const dbType = this.configService.get<string>('DB_TYPE')
        const dBObject = getDBObject(dbType)
        const { rows } = await dBObject.execute(`select * from ${setupTable}`)
        return new Promise(async (resolve, reject) => {
            resolve(true)
            const requests = []

            if (!rows.length) {
                this.loggerService.trace('> No setup module data, stop upgrade')
                resolve(true)
                return
            }

            this.schemaVersion = rows.find(e => e['key'] === 'schema_version')['version']
            this.dataVersion = rows.find(e => e['key'] === 'data_version')['version']
            const baseSchemaVersion = this.schemaVersion
            const baseDataVersion = this.dataVersion

            const updateSchemaRequest = await this.checkUpdateFiles('schema')
            const updateDataRequest = await this.checkUpdateFiles('data')

            requests.push(...updateSchemaRequest, ...updateDataRequest)
            if (requests.length <= 0) {
                this.loggerService.trace('> No need to upgrade, stop')
                resolve(true)
                return
            }

            try {
                let error = false
                await asyncForEach([...requests], async (query: string) => {
                    const result = await dBObject.execute(query)
                    if (result === null) {
                        error = true
                        this.loggerService.trace('> Upgrade schema : query error')
                    }
                })
                if (error) {
                    this.loggerService.trace('> Upgrade query executed with error, check log and retry')
                    reject(false)
                    return
                }

                this.loggerService.trace('> Upgrade query executed with success')

                if (baseSchemaVersion !== this.schemaVersion) {
                    await dBObject.execute(`
                        UPDATE ${getProtectedDbData(dbType, setupTable)} 
                        SET ${getProtectedDbData(dbType, 'version')} = '${this.schemaVersion}' 
                        WHERE ${getProtectedDbData(dbType, 'key')} = 'schema_version'`
                    )
                }

                if (baseDataVersion !== this.dataVersion) {
                    await dBObject.execute(`
                        UPDATE ${getProtectedDbData(dbType, setupTable)} 
                        SET ${getProtectedDbData(dbType, 'version')} = '${this.dataVersion}' 
                        WHERE ${getProtectedDbData(dbType, 'key')} = 'data_version'`
                    )
                }

                this.loggerService.trace('Upgrade schema complete')
                resolve(true)
            } catch (e) {
                this.loggerService.fatal(e.message)
                reject(e)
            }
        })
    }

    private async checkUpdateFiles(type: string): Promise<Array<string>> {
        const requests = []
        const version = type === 'schema' ? this.schemaVersion : this.dataVersion
        const upgradeFolders = await fetchFolder(join(__dirname, '../..', this.configService.get<string>('NODE_ENV') === 'production' ? 'dist/_database/_upgrade' : 'src/_database/_upgrade', type))
        await asyncForEach(upgradeFolders, async (upgradeFolder: string) => {
            const folderName = upgradeFolder.replace(/\\/g, '/').split(/\//).pop()
            if (folderName > version) {
                const upgradeFiles = await fetchFiles(upgradeFolder)
                upgradeFiles.forEach((upgradeFile: string) => {
                    const sqlFileContent = fs.readFileSync(upgradeFile).toString()
                        .replace(/(\r\n|\n|\r)/gm, ' ')
                        .replace(/\s+/g, ' ')
                        .split(';')
                        .map(Function.prototype.call, String.prototype.trim)
                        .filter((e) => e.length)
                    sqlFileContent.map(e => requests.push(e))
                    type === 'schema' ?
                        this.schemaVersion = folderName :
                        this.dataVersion = folderName
                })
            }
        })

        return requests
    }
}
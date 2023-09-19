import { Injectable } from '@nestjs/common'
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto'
import { promisify } from 'util'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class CryptoService {
    constructor(
        private readonly configService: ConfigService
    ) { }

    async getAlgorithmAndKey(): Promise<{ key: Buffer, algorithm: string }> {
        const algorithm = this.configService.get<string>('ENCRYPTION_ALGORITHM')
        const secretKey = this.configService.get<string>('ENCRYPTION_SECRET')
        const key = (await promisify(scrypt)(secretKey, 'salt', 32)) as Buffer
        return { key, algorithm }
    }

    async encrypt(data: string | Buffer): Promise<string> {
        const { key, algorithm } = await this.getAlgorithmAndKey()
        const iv = randomBytes(16)
        const cipher = createCipheriv(algorithm, Buffer.from(key), iv)
        const encryptedData = typeof data == 'string' ?
            `${cipher.update(data, 'utf-8', 'hex')}${cipher.final('hex')}` :
            Buffer.concat([cipher.update(data), cipher.final()])
        const encryptedObj = { iv: iv.toString('hex'), encryptedData }
        return Buffer.from(JSON.stringify(encryptedObj)).toString('base64')
    }

    async decrypt(data: string): Promise<string | Buffer> {
        const { iv, encryptedData } = JSON.parse(Buffer.from(data, 'base64').toString()) as { iv: string, encryptedData: string | { data: Array<any> } }
        const { key, algorithm } = await this.getAlgorithmAndKey()
        const decipher = createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'))
        const decryptedData = typeof encryptedData === 'string' ?
            `${decipher.update(encryptedData, 'hex', 'utf-8')}${decipher.final('utf8')}` :
            Buffer.concat([decipher.update(Buffer.from(encryptedData.data)), decipher.final()])

        return decryptedData
    }
}

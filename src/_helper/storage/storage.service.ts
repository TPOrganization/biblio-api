import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
// import { ExpressMulterFile } from './storage-file'
// import { Readable } from 'stream'

@Injectable()
export class StorageService {
    constructor(
        private readonly configService: ConfigService
    ) {
    }

    // async uploadFile(uploadedFile: ExpressMulterFile): Promise<string> {
    //     // Todo
    // }

    // async downloadFile(uniqId: string): Promise<{ file: Readable, size: number }> {
    //     // Todo
    // }

    // async deleteFile(uniqId: string): Promise<boolean> {
    //     // Todo
    // }
}

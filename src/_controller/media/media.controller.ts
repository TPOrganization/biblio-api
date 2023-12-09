import { Controller } from '@nestjs/common'
import { StorageService } from 'src/_helper/storage/storage.service'
import { ConfigService } from '@nestjs/config'
import * as path from 'path'

@Controller(__dirname.split(path.sep).pop())
export class MediaController {
    constructor(
        private readonly _storageService: StorageService,
        private readonly _configService: ConfigService
    ) { }
}

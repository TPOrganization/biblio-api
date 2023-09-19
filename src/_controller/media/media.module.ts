import { Module } from '@nestjs/common'
import { MediaController } from './media.controller'
import { StorageService } from 'src/_helper/storage/storage.service'
import { MediaService } from './media.service'
import { CryptoService } from 'src/_helper/_crypto.service'

@Module({
    controllers: [
        MediaController
    ],
    providers: [
        MediaService,
        StorageService,
        CryptoService,
    ],
})
export class MediaModule { }

import { Global, Module } from '@nestjs/common'
import { CryptoService } from '../_crypto.service'
import { StorageService } from './storage.service'

@Global()
@Module({
    providers: [
        StorageService,
    ],
    exports: [
        StorageService,
        CryptoService
    ]
})
export class StorageModule { }

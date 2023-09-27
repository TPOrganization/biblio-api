import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { User } from '../_entity/user/user.entity'
import { StorageService } from 'src/_helper/storage/storage.service'
import { CryptoService } from 'src/_helper/_crypto.service'

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [
        UserService,
        StorageService,
        CryptoService
    ],
    exports: [UserService]
})
export class UserModule { }

import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UtilisateurService } from './utilisateur.service'
import { UtilisateurController } from './utilisateur.controller'
import { Utilisateur } from '../_entity/utilisateur/utilisateur.entity'
import { StorageService } from 'src/_helper/storage/storage.service'
import { CryptoService } from 'src/_helper/_crypto.service'

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Utilisateur])],
    controllers: [UtilisateurController],
    providers: [
        UtilisateurService,
        StorageService,
        CryptoService
    ],
    exports: [UtilisateurService]
})
export class UtilisateurModule { }

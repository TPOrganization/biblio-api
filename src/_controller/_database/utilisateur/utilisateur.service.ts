import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ModelService } from 'src/_controller/_database/_model.service'
import { Utilisateur } from '../_entity/utilisateur/utilisateur.entity'

export class UtilisateurService extends ModelService<Utilisateur> {
    constructor(
        @InjectRepository(Utilisateur)
        public readonly repository: Repository<Utilisateur>,
    ) {
        super(repository)
    }
}

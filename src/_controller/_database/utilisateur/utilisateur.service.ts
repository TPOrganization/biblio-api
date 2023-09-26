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

    findAll(): Promise<Utilisateur[]> {
        return this.repository.find();
      }
    
    //   findOne(id: number): Promise<Utilisateur | null> {
    //     return this.repository.findOneBy({ id });
    //   }
    
      async remove(id: number): Promise<void> {
        await this.repository.delete(id);
      }
}

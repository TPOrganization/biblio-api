import { InjectRepository } from '@nestjs/typeorm'
import { ModelService } from 'src/_controller/_database/_model.service'
import { User } from '../_entity/user/user.entity'
import { Repository } from 'typeorm'

export class UserService extends ModelService<User> {
    constructor(
        @InjectRepository(User)
        public readonly repository: Repository<User>,
    ) {
        super(repository)
    }
    
    async findLogin(login: string): Promise<User | null> {
        return await this.repository.findOneBy({ email: login })
    }
}

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ModelService } from 'src/_controller/_database/_model.service'
import { User } from '../_entity/user/user.entity'

export class UserService extends ModelService<User> {
    constructor(
        @InjectRepository(User)
        public readonly repository: Repository<User>,
    ) {
        super(repository)
    }
}

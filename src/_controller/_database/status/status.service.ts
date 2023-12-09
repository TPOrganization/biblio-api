import { ModelService } from 'src/_controller/_database/_model.service'
import { Status } from '../_entity/status/status.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

export class StatusService extends ModelService<Status> {
    constructor(
        @InjectRepository(Status)
        public readonly repository: Repository<Status>,
    ) {
        super(repository)
    }
}
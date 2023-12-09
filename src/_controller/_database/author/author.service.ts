import { InjectRepository } from '@nestjs/typeorm'
import { ModelService } from 'src/_controller/_database/_model.service'
import { Repository } from 'typeorm'
import { Author } from '../_entity/author/author.entity'

export class AuthorService extends ModelService<Author> {
    constructor(
        @InjectRepository(Author)
        public readonly repository: Repository<Author>,
    ) {
        super(repository)
    }

}
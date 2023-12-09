import { InjectRepository } from '@nestjs/typeorm'
import { ModelService } from 'src/_controller/_database/_model.service'
import { Repository } from 'typeorm'
import { typesOfBooks } from '../_entity/typeOfBooks/typeOfBooks.entity'


export class typesOfBooksService extends ModelService<typesOfBooks> {
    constructor(
        @InjectRepository(typesOfBooks)
        public readonly repository: Repository<typesOfBooks>,
    ) {
        super(repository)
    }

}
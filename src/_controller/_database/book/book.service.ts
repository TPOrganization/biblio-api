import { InjectRepository } from '@nestjs/typeorm'
import { ModelService } from 'src/_controller/_database/_model.service'
import { Repository } from 'typeorm'
import { Book } from '../_entity/book/book.entity'


export class BookService extends ModelService<Book> {
    constructor(
        @InjectRepository(Book)
        public readonly repository: Repository<Book>,
    ) {
        super(repository)
    }

    async findBookOfUsers(userId: number): Promise<Book[]> {
        return this.repository.find({ where: { userId: userId } })
    }
}
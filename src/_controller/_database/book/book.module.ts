import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Book } from '../_entity/book/book.entity'
import { BookService } from './book.service'
import { BookController } from './book.controller'

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Book])],
    controllers: [BookController],
    providers: [BookService],
    exports: [BookService]
})
export class BookModule { }
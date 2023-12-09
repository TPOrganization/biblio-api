import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typesOfBooks } from '../_entity/typeOfBooks/typeOfBooks.entity'
import { TypeOfBooksController } from './typesOfBooks.controller'
import { typesOfBooksService } from './typesOfBooks.service'

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([typesOfBooks])],
    controllers: [TypeOfBooksController],
    providers: [typesOfBooksService],
    exports: [typesOfBooksService]
})
export class typesOfBooksModule { }
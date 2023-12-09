import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthorService } from './author.service'
import { AuthorController } from './author.controller'
import { Author } from '../_entity/author/author.entity'

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Author])],
    controllers: [AuthorController],
    providers: [AuthorService],
    exports: [AuthorService]
})
export class AuthorModule { }
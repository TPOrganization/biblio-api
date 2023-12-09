import { Body, Controller, Get, Post } from '@nestjs/common'
import { ModelController } from 'src/_controller/_database/_model.controller'
import { Book } from '../_entity/book/book.entity'
import { BookService } from './book.service'
import { typesOfBooks } from '../_entity/typeOfBooks/typeOfBooks.entity'
import { Status } from '../_entity/status/status.entity'
import { typesOfBooksService } from '../typesOfBooks/typesOfBooks.service'
import { StatusService } from '../status/status.service'
import { Author } from '../_entity/author/author.entity'
import { AuthorService } from '../author/author.service'
import { CurrentUser } from 'src/_helper/decorator/user.decorator'
import { User } from '../_entity/user/user.entity'
import * as path from 'path'

@Controller(__dirname.split(path.sep).pop())
export class BookController extends ModelController<Book> {
    constructor(
        public readonly service: BookService,
        private readonly _typesOfBooksService: typesOfBooksService,
        private readonly _statusService: StatusService,
        private readonly _authorService: AuthorService
    ) {
        super(service)
    }


    @Get()
    async findBookOfUsers(
        @CurrentUser() user: User
    ): Promise<Book[]> {
        return await this.service.findBookOfUsers(user.id)
    }

    @Get('/types-of-books-status-author')
    async getDataForChips(): Promise<{ typesOfBooks: typesOfBooks[], status: Status[], author: Author[] }> {
        return {
            typesOfBooks: await this._typesOfBooksService.find(),
            status: await this._statusService.find(),
            author: await this._authorService.find()
        }
    }


    @Post()
    async createFromCurrentUser(
        @CurrentUser() user: User,
        @Body() entity: Book
    ) {
        entity.userId = user.id
        return await this.service.create(entity)
    }
}


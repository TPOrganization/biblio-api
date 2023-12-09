import { Controller, Post, Patch, Delete, UnauthorizedException } from '@nestjs/common'
import { ModelController } from 'src/_controller/_database/_model.controller'
import { typesOfBooks } from '../_entity/typeOfBooks/typeOfBooks.entity'
import { typesOfBooksService } from './typesOfBooks.service'
import * as path from 'path'

@Controller(__dirname.split(path.sep).pop())
export class TypeOfBooksController extends ModelController<typesOfBooks> {
    constructor(
        public readonly service: typesOfBooksService,
    ) {
        super(service)
    }

    @Post() async removeCreate() { throw new UnauthorizedException() }
    @Patch(':id') async removeUpdate() { throw new UnauthorizedException() }
    @Delete(':id') async removeDelete() { throw new UnauthorizedException() }
}


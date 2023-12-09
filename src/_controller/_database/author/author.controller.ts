import { Controller, Delete, Patch, Post, UnauthorizedException } from '@nestjs/common'
import { ModelController } from 'src/_controller/_database/_model.controller'
import * as path from 'path'
import { AuthorService } from './author.service'
import { Author } from '../_entity/author/author.entity'

@Controller(__dirname.split(path.sep).pop())
export class AuthorController extends ModelController<Author> {
    constructor(
        public readonly service: AuthorService,
    ) {
        super(service)
    }

    @Post() async removeCreate() { throw new UnauthorizedException() }
    @Patch(':id') async removeUpdate() { throw new UnauthorizedException() }
    @Delete(':id') async removeDelete() { throw new UnauthorizedException() }
    
}


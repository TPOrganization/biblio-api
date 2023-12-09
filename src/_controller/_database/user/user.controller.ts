import { Controller } from '@nestjs/common'
import { ModelController } from 'src/_controller/_database/_model.controller'
import { User } from '../_entity/user/user.entity'
import * as path from 'path'
import { UserService } from './user.service'

@Controller(__dirname.split(path.sep).pop())
export class UserController extends ModelController<User> {
    constructor(
        public readonly service: UserService,
    ) {
        super(service)
    }

}
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../_database/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor( private readonly _userService : UserService ){}

    async signIn(login: string, password: string): Promise<any>{
        const user = await this._userService.findLogin(login)
        const isPasswordMatching = await bcrypt.compare(
            password,
            user.password
        )
        if (!user || !isPasswordMatching) {
            throw new UnauthorizedException();
        }
        return "coucou"
    }
}

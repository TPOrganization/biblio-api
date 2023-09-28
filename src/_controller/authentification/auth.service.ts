import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../_database/user/user.service';

@Injectable()
export class AuthService {
    constructor( private readonly _userService : UserService ){}

    async signIn(login: string, password: string): Promise<any>{
        const user = await this._userService.findLogin(login)
        if (!user || password !== user.password) {
            throw new UnauthorizedException();
        }
        return "coucou"
    }
}

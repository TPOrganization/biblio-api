import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../_database/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor( 
        private readonly _userService : UserService,
        private jwtService : JwtService
        ){}

    async signIn(login: string, password: string): Promise<any>{
        const user = await this._userService.findLogin(login)
        const isPasswordMatching = await bcrypt.compare(
            password,
            user.password
        )
        if (!user || !isPasswordMatching) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.lastName}
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../_database/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../_database/_entity/user/user.entity';

@Injectable()
export class AuthService {
    constructor(private readonly _userService: UserService) { }

    async signIn(login: string, password: string): Promise<any> {
        const userLogin = await this._userService.findLogin(login)
        const isPasswordMatching = await bcrypt.compare(
            password,
            userLogin.password
        )
        if (!userLogin || !isPasswordMatching) {
            throw new UnauthorizedException();
        }
        return "Connecté"
    }


    async signUp(user: User): Promise<any> {
        if (user.password === '') {
            throw new UnauthorizedException();
        } else {
            const hashPassword = await bcrypt.hash(user.password, 10)
            const createNewUser = this._userService._repository.create({
                ...user,
                password: hashPassword
            })
            this._userService._repository.save(createNewUser)
            return 'Compte créé ! '
        }

    }
}

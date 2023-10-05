import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'
import { User } from 'src/_controller/_database/_entity/user/user.entity'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super()
    }

    async validate(username: string, password: string): Promise<User> {
        const user: User | null = await this.authService.validateUser(username, password)
        if (!user) {
            throw new UnauthorizedException()
        }
        delete user.password
        return user
    }
}

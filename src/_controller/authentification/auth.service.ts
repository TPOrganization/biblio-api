import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../_database/user/user.service'
import { User } from '../_database/_entity/user/user.entity'
import { ConfigService } from '@nestjs/config'
import { MailService } from 'src/_helper/mail/mail.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

export interface SignUpData {
    lastName: string,
    firstName: string,
    email: string,
    password: string,
    passwordConfirm: string
}

@Injectable()
export class AuthService {
    constructor(
        private readonly _userService: UserService,
        private readonly _jwtService: JwtService,
        private readonly _configService: ConfigService,
        private readonly _mailService: MailService
    ) { }

    async validateUser(login: string, password: string): Promise<any> {
        if (!login) {
            throw new UnauthorizedException()
        }
        const user = await this._userService.findLogin(login)
        if (!user || !password) {
            throw new UnauthorizedException()
        }
        const isPasswordMatching = await bcrypt.compare(
            password,
            user.password
        )
        if (!isPasswordMatching) {
            throw new UnauthorizedException()
        }

        return user
    }

    async signIn(user: User) {
        return {
            accessToken: this._jwtService.sign({ user: user }),
            user: user
        }
    }

    async signUp(user: SignUpData): Promise<User> {
        if (user.password === '' || user.password !== user.passwordConfirm) {
            throw new ForbiddenException()
        }

        const userLogin = await this._userService.findLogin(user.email)
        if (userLogin) {
            throw new ForbiddenException()
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(user.password, salt)
        const createNewUser = this._userService._repository.create({
            ...user,
            password: hashPassword
        })
        const result = await this._userService._repository.save(createNewUser)
        delete result.password
        return result
    }

    async forgotPassword(email: string): Promise<boolean> {
        if (!email) {
            throw new UnauthorizedException()
        }
        const user = await this._userService.findLogin(email)
        if (!user) {
            throw new UnauthorizedException()
        }

        delete user.password
        const token = await this._jwtService.sign({ ...user })
        const link = `${this._configService.get<string>('FRONT_URL')}/reset-password?token=${token}`
        return await this._mailService.sendMail(user.email, 'reset mdp', link)
    }

    async resetPassword(user: User, password: string, confirm: string) {
        if (password === confirm) {
            const salt = await bcrypt.genSalt(10)
            const hashNewPassword = await bcrypt.hash(password, salt)
            const userExist = await this._userService.findOne(user.id)
            if (userExist) {
                await this._userService._repository.save({
                    ...user,
                    password: hashNewPassword
                })
                return true
            }
            else {
                throw new Error
            }
        } else {
            throw new Error('Les mots de passe ne sont pas identiques')
        }
    }
}

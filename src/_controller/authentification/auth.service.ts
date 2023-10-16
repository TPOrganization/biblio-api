import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../_database/user/user.service'
import { User } from '../_database/_entity/user/user.entity'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'
import { MailService } from 'src/_helper/mail/mail.service'


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
        private readonly _configService: ConfigService,
        private readonly _mailService: MailService
    ) { }

    async signIn(login: string, password: string): Promise<any> {
        const userLogin = await this._userService.findLogin(login)
        console.log(userLogin)
        const isPasswordMatching = await bcrypt.compare(
            password,
            userLogin.password
        )
        if (!userLogin || !isPasswordMatching) {
            throw new UnauthorizedException()
        }
        return 'Connecté'
    }


    async signUp(user: SignUpData): Promise<any> {
        if (user.password === '') {
            throw new UnauthorizedException()
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(user.password, salt)
            const createNewUser = this._userService._repository.create({
                ...user,
                password: hashPassword
            })
            this._userService._repository.save(createNewUser)
            return 'Compte créé ! '
        }
    }


    async forgotPassword(user: User) {
        if (!user) throw new Error('Email does not exist')

        const token = 'prout'
        //lien pour reset son mdp a mettre dans le mail de reset
        //const link = `${this._configService.get<string>('FRONT_URL')}/forgotPassword?token=${token}`
    }


    async resetPassword(user: User, password: string, confirm: string) {
        const token = 'prout'
        if (password === confirm) {
            const salt = await bcrypt.genSalt(10)
            const hashNewPassword = await bcrypt.hash(password, salt)
            const userExist = await this._userService.findOne(user.id)
            if (userExist) {
                await this._userService._repository.save({
                    ...user,
                    password: hashNewPassword
                })
            }
            else {
                throw new Error('L\'utilisateur n\'existe pas')
            }

            //envoi mail pour confirmer la modification du mdp ?
            //const link = `${this._configService.get<string>('FRONT_URL')}/resetPassword?token=${token}`

        } else {

            throw new Error('Les mots de passe ne sont pas identiques')
        }
    }

}

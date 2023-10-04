import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../_database/user/user.service';
import { User } from '../_database/_entity/user/user.entity';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/_helper/mail/mail.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly _userService: UserService,
        private readonly _configService: ConfigService,
        private readonly _mailService : MailService
    ) { }

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



    //requete faite par le user pour récuper son mdp
    async forgotPassword(user: User) {

        //si le user n'existe pas alors err
        if (!user) throw new Error("Email does not exist")

        const token = 'prout'

        //lien pour reset son mdp a mettre dans le mail de reset
        const link = `${this._configService.get<string>('FRONT_URL')}/forgotPassword?token=${token}`;
        
        const sendMail = this._mailService.sendMail(user.email, "forgotPassword", link)
        
    }


    //fonction pour créé un nouveau mdp
    // async resetPassword(user: User) {
    //     //

    //     //

    // }
}

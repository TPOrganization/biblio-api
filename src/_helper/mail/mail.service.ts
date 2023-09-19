import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createTransport, Transporter } from 'nodemailer'

@Injectable()
export class MailService {

    constructor(
        private readonly configService: ConfigService,
    ) { }

    // async sendMail(
    //     to: string | Array<string>,
    //     subject: string, body: string,
    // ): Promise<any> {
    //     // Todo
    // }

    // private _createTransporter(): Transporter {
    //     // Todo
    // }
}

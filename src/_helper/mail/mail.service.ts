import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Transporter, createTransport } from 'nodemailer'
import { MailOptions } from 'nodemailer/lib/json-transport'

@Injectable()
export class MailService {

    constructor(
        private readonly _configService: ConfigService,
    ) { }

    async sendMail(
        to: string | Array<string>,
        subject: string,
        body: string,
    ): Promise<boolean> {

        const transporter = this._createTransporter()
        const mailOptions: MailOptions = {
            to: this._configService.get<string>('EMAIL_ADMIN_REDIRECT') === 'true' ?
                this._configService.get<string>('EMAIL_ADMIN_ADDRESS') :
                to,
            subject,
            text: body
        }
        const result = await transporter.sendMail(mailOptions)
        const mailToCheck = Array.isArray(mailOptions.to) ? mailOptions.to : [mailOptions.to]
        return result && Array.isArray(result.accepted) && result.accepted.every(e => mailToCheck.includes(e))
    }

    private _createTransporter(): Transporter {
        return createTransport({
            host: this._configService.get<string>('MAILJET_HOST'),
            port: this._configService.get<number>('MAILJET_PORT'),
            secure: false,
            requireTLS: true,
            auth: {
                user: this._configService.get<string>('MAILJET_USER'),
                pass: this._configService.get<string>('MAILJET_PASSWORD'),
            },
            logger: this._configService.get<string>('EMAIL_LOG') === 'true'
        }, {
            from: this._configService.get('EMAIL_FROM_ADDRESS')
        })
    }
}

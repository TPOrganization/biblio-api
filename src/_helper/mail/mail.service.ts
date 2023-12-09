import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class MailService {

    constructor(
        private readonly configService: ConfigService,
        private readonly mailerService: MailerService
    ) { }

    async sendMail(
        to: string | Array<string>,
        subject: string,
        body: string,
    ): Promise<boolean> {

        const result = await this.mailerService.sendMail({
            to: this.configService.get<string>('EMAIL_ADMIN_REDIRECT') === 'true' ? this.configService.get<string>('EMAIL_ADMIN_ADDRESS') : to,
            subject,
            text: body
        })
        console.log(result)
        return result
    }

    // private _createTransporter(): Transporter {
    //     // Todo
    // }
}

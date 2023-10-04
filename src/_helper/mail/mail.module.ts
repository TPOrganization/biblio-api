import { Global, Module } from '@nestjs/common'
import { MailService } from './mail.service'
import { HttpModule } from '@nestjs/axios'
import { MailerModule } from '@nestjs-modules/mailer'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Global()
@Module({
    imports: [
        HttpModule,
        MailerModule.forRootAsync({
            useFactory: async (config: ConfigService) => ({
                transport: {
                    host: config.get('MAILJET_HOST'),
                    port: config.get('MAILJET_PORT'),
                    secure: false,
                    auth: {
                        user: config.get('MAILJET_USER'),
                        pass: config.get('MAILJET_PASSWORD'),
                    },
                },
                defaults: {
                    from: config.get('EMAIL_FROM_ADDRESS'),
                },
                preview: true,
                // template: {
                //     dir: process.cwd() + '/template/',
                //     adapter: new HandlebarsAdapter(),
                //     options: {
                //         strict: true,
                //     },
                // },
            }),
            inject: [ConfigService]
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule { }

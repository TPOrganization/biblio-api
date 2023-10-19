import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common'
import { AuthService, SignUpData } from './auth.service'
import { User } from '../_database/_entity/user/user.entity'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('sign-in')
    singIn(@Body() { login, password }: { login: string, password: string }) {
        return this.authService.signIn(login, password)
    }

    @Post('sign-up')
    singUp(@Body() data: SignUpData) {
        return this.authService.signUp(data)
    }

    @Post('forgot-password')
    forgotPassword(@Body() { email }: { email: string }) {
        return this.authService.forgotPassword(email)
    }

    @Post('reset-password')
    resetPassword(@Body() { data, password, confirm }: { data: User, password: string, confirm: string }) {
        return this.authService.resetPassword(data, password, confirm)
    }

}

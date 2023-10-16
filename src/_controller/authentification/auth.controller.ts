import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common'
import { AuthService, SignUpData } from './auth.service'
import { User } from '../_database/_entity/user/user.entity'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('sign-in')
    singIn(@Body() data: User) {
        return this.authService.signIn(data.email, data.password)
    }

    @Post('sign-up')
    singUp(@Body() data: SignUpData) {
        console.log(data)
        return this.authService.signUp(data)
    }

    @Post('forgot-password')
    forgotPassword(@Body() data:User){
        return this.authService.forgotPassword(data)
    }

    @Post('reset-password')
    resetPassword(@Body() @Body() { data, password, confirm } : { data: User, password: string, confirm:string}){
        return this.authService.resetPassword(data, password, confirm)
    }

}

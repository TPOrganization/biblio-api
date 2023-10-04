import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { User } from '../_database/_entity/user/user.entity'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('signIn')
    singIn(@Body() user: User) {
        return this.authService.signIn(user.email, user.password)

    }

    @Post('signUp')
    singUp(@Body() user: User) {
        return this.authService.signUp(user)
    }

    @Post('forgotPassword')
    forgotPassword(@Body() user:User){
        return this.authService.forgotPassword(user)
    }

    @Post('resetPassword')
    resetPassword(@Body() user:User){
        return this.authService.forgotPassword(user)
    }

}

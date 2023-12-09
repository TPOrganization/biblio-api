import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common'
import { AuthService, SignUpData } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { CurrentUser } from 'src/_helper/decorator/user.decorator'
import { User } from '../_database/_entity/user/user.entity'

@Controller('auth')
export class AuthController {
    constructor(
        private readonly _authService: AuthService
    ) { }

    @Post('sign-in')
    @UseGuards(LocalAuthGuard)
    singIn(@CurrentUser() user: User) {
        return this._authService.signIn(user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/user')
    user(@CurrentUser() user: User) {
        return user
    }

    @Post('sign-up')
    singUp(@Body() data: SignUpData) {
        return this._authService.signUp(data)
    }

    @Post('forgot-password')
    forgotPassword(@Body() { email }: { email: string }) {
        return this._authService.forgotPassword(email)
    }

    @Post('reset-password')
    @UseGuards(JwtAuthGuard)
    resetPassword(
        @CurrentUser() { user }: { user: User },
        @Body() { password, confirm }: { password: string, confirm: string }
    ) {
        return this._authService.resetPassword(user, password, confirm)
    }
}

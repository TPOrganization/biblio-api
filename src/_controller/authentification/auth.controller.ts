import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../_database/_entity/user/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @HttpCode(HttpStatus.OK)
        @Post('login')
        singIn(@Body() user: User ){
            return this.authService.signIn(user.email, user.password)
        
    }
}

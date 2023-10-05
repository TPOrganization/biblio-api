import { Module, Global } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'

@Global()
@Module({
    controllers: [AuthController],
    providers: [
        AuthService, 
        LocalStrategy,
        JwtStrategy,
    ],
    exports: [AuthService],
})
export class AuthModule { }

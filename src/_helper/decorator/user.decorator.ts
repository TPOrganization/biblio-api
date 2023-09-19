import { createParamDecorator, ExecutionContext } from '@nestjs/common'

// Sert à récupérer l'utilisateur connecté depuis les requêtes entrantes
export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        const user = {
            user: request.user['user'] ? { ...request.user['user'] } : request.user,
            maintenance: global.maintenance ?? false
        }
        return user
    },
)

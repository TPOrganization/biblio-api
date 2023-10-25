import { createParamDecorator, ExecutionContext } from '@nestjs/common'

// Sert à récupérer l'User connecté depuis les requêtes entrantes
export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        const user = {
            user: request.user['user'] ? { ...request.user['user'] } : request.user
        }
        return user
    },
)

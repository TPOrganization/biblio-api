import { Global, Module } from '@nestjs/common'
import { Status } from '../_entity/status/status.entity'
import { StatusController } from './status.controller'
import { StatusService } from './status.service'
import { TypeOrmModule } from '@nestjs/typeorm'

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Status])],
    controllers: [StatusController],
    providers: [StatusService],
    exports: [StatusService]
})
export class StatusModule { }
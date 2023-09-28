/* eslint-disable */
import { Controller, Get, Param } from '@nestjs/common'
import { ModelService } from './_model.service'

@Controller()
export class ModelController<T>{
    constructor(
        public service: ModelService<T>
    ) { }

    @Get()
    async find(): Promise<T[]> {
        return await this.service.find()
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.service.findOne(id)
    }

}

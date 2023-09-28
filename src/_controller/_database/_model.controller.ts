/* eslint-disable */
import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common'
import { ModelService } from './_model.service'

@Controller()
export class ModelController<T>{
    constructor(
        public service: ModelService<T>
    ) { }

    @Post()
    async create(@Body() entity: T) {
        return await this.service.create(entity)
    }

    @Get()
    async find(): Promise<T[]> {
        return await this.service.find()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.service.findOne(+id)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() entity: T) {
        return await this.service.update(+id, entity)
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.service.delete(+id)
    }


}

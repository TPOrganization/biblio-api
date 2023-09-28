import { FindOptionsWhere, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ModelService<T>{

    public primaryKey: string = 'id'

    constructor(
        public readonly _repository: Repository<T>
    ) { }

    async create(entity: T): Promise<T>{
        return await this._repository.save(entity)
    }

    async find(): Promise<T[]> {
        return await this._repository.find()
    }

    async findOne(id: number): Promise<T> {
        const whereObject: FindOptionsWhere<T> = {}
        whereObject[this.primaryKey] = id
        return await this._repository.findOne({ where: whereObject })
    }
 
    async update(id: number, entity:T){
        const whereObject: FindOptionsWhere<T> = {}
        whereObject[this.primaryKey] = id
        const toUpdate = await this._repository.findOne({ where: whereObject })
        const updated = Object.assign(toUpdate, entity)

        return await this._repository.save(updated)
    }

    async delete(id: number): Promise<boolean>{
        const deleteResult = await this._repository.delete(id)
        return deleteResult.affected === 1
    }


}

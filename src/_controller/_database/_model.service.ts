import { FindOptionsWhere, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ModelService<T>{

    public primaryKey: string = 'id'

    constructor(
        public readonly _repository: Repository<T>
    ) { }

    async find(): Promise<T[]> {
        return await this._repository.find()
    }

    async findOne(id: number): Promise<T> {
        const whereObject: FindOptionsWhere<T> = {}
        whereObject[this.primaryKey] = id
        return await this._repository.findOne({ where: whereObject })
    }

    // create()

    // findOne()
    // update()
    // delete()
}

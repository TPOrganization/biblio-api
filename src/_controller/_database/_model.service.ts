import { Repository } from 'typeorm'

export class ModelService<T>{
    constructor(
        public readonly _repository: Repository<T>
    ) { }

    // TODO Function générique ici
}

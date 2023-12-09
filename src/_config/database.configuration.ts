import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
// import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm'

// A Utiliser uniquement si les noms des tables / champs sont en camel
// class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
//     tableName = (className: string): string => className // Permet de faire fonctionner le camel case sur les tables "MaTable"
//     columnName = (propertyName: string): string => propertyName
// }

@Injectable()
export class DataBaseConfiguration implements TypeOrmOptionsFactory {
    constructor (
        private readonly configService : ConfigService 
    ){}
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: this.configService.get<any>('DB_TYPE'),
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_DATABASE'),
            entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
            synchronize: false,
        }
    }
}


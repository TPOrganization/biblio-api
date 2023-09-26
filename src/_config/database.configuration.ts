import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Author } from 'src/_controller/_database/_entity/author/author.entity';
import { Book } from 'src/_controller/_database/_entity/book/book.entity';
import { BookType } from 'src/_controller/_database/_entity/bookType/bookType.entity';
import { Status } from 'src/_controller/_database/_entity/status/status.entity';
import { Type } from 'src/_controller/_database/_entity/type/type.entity';
import { Utilisateur } from 'src/_controller/_database/_entity/utilisateur/utilisateur.entity';
import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm'

// A Utiliser uniquement si les noms des tables / champs sont en camel
class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
    tableName = (className: string): string => className // Permet de faire fonctionner le camel case sur les tables "MaTable"
    columnName = (propertyName: string): string => propertyName
}

@Injectable()
export class DataBaseConfiguration implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'angeliqueg',
            password: '1234',
            database: 'biblio_app_dev',
            entities: [Utilisateur, Book, BookType, Type, Status, Author],
            synchronize: false,
        };
    }
}


import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm'

// A Utiliser uniquement si les noms des tables / champs sont en camel
class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
    tableName = (className: string): string => className // Permet de faire fonctionner le camel case sur les tables "MaTable"
    columnName = (propertyName: string): string => propertyName
}

// Todo : class DatabaseConfiguration
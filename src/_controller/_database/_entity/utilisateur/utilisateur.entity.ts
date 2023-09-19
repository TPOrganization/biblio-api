import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Utilisateur {
    @PrimaryGeneratedColumn()
    Id: number
}
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    Id: number

    @Column()
    name : string

}
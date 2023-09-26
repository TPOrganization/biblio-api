import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Type {
    @PrimaryGeneratedColumn()
    Id: number

    @Column()
    label : string;

}
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Status {
    @PrimaryGeneratedColumn()
    Id: number

    @Column()
    label : string;

}
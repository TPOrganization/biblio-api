import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    Id: number

    @Column()
    userId : string

    @Column()
    statusId : string

    @Column()
    author_id : string

    @Column()
    title : string

    @Column()
    comment : string

    @Column()
    start_date : string

    @Column()
    end_date : string

    @Column()
    cover : string
}
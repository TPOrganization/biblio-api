import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId : string

    @Column()
    statusId : string

    @Column()
    authorId : string

    @Column()
    title : string

    @Column()
    comment : string

    @Column({ name : 'start_date' })
    startDate : string

    @Column({ name : 'end_date' })
    endDate : string

    @Column()
    cover : string
}
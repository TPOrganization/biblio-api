import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Book } from '../book/book.entity'

@Entity()
export class Status {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    label : string

    @Column()
    color : string

    @OneToMany(() => Book, (e) => e.statusId)
    books: Book[]
}
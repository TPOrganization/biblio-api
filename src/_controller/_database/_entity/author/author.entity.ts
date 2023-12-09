import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Book } from '../book/book.entity'

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name : string

    @OneToMany(() => Book, (e) => e.authorId)
    books: Book[]
}
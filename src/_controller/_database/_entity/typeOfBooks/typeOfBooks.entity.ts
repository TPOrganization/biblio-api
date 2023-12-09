import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Book } from '../book/book.entity'

@Entity()
export class typesOfBooks {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    label: string

    @ManyToMany(() => Book, (e) => e.typesOfBooks, { eager: false })
    @JoinTable()
    books: Book[]
}
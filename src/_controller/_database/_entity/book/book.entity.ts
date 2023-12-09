import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Author } from '../author/author.entity'
import { typesOfBooks } from '../typeOfBooks/typeOfBooks.entity'
import { Status } from '../status/status.entity'

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'user_id' })
    userId: number

    @Column({ name: 'status_id' })
    statusId: number

    @Column({ name: 'author_id' })
    authorId: number

    @Column()
    title: string

    @Column()
    comment: string

    @Column({ name: 'start_date' })
    startDate: string

    @Column({ name: 'end_date' })
    endDate: string

    @Column()
    isbn: string


    @ManyToOne(() => Status, (e) => e.books)
    @JoinColumn({ name: 'status_id' })

    @ManyToOne(() => Author, (e) => e.books, { eager: true })
    @JoinColumn({ name: 'author_id' })

    @ManyToMany(() => typesOfBooks, (e) => e.books, { eager: true, orphanedRowAction: 'delete' })
    @JoinTable({
        name: 'book_type',
        joinColumn: {
            name: 'book_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'type_id',
            referencedColumnName: 'id'
        }
    })
    typesOfBooks: typesOfBooks[]

}
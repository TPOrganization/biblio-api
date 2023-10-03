import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class BookType {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    bookId : string

    @Column()
    typeId : string

}
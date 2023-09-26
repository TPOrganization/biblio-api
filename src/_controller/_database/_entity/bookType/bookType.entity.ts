import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class BookType {
    @PrimaryGeneratedColumn()
    Id: number

    @Column()
    bookId : string

    @Column()
    typeId : string

}
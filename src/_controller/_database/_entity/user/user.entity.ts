import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'last_name' })
    lastName: string

    @Column({ name: 'first_name' })
    firstName: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    avatar: string
}

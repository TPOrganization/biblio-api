import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Utilisateur {
    @PrimaryGeneratedColumn()
    Id: number

    @Column()
    lastName : string;

    @Column()
    firstName : string;

    @Column()
    email : string;

    @Column()
    password : string;

    @Column()
    avatar : string;
}

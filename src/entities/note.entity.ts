import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {IUser} from "../interfaces/IUser";
import {User} from "./user.entity";

@Entity()
export class Note{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    encryptedText: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({type:'timestamp', nullable: true})
    deleted_ad: Date;

    @ManyToOne(() => User, user => user.notes)
    user: User
}

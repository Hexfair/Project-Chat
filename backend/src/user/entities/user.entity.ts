import { Message } from 'src/message/entities/message.entity';
import { Room } from 'src/room/entities/room.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn({ name: 'user_id' })
	id: number;

	@Column()
	username: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	status: string;

	@Column({ nullable: true })
	avatarUrl: string;

	@OneToMany(() => Room, (room) => room.user1 || room.user2)
	rooms: Room[];

	@OneToMany(() => Message, (message) => message.user)
	messages: Message[];

	@Column()
	code: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}

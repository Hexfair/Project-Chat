import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import {
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
//===========================================================================================================

@Entity()
export class Room {
	@PrimaryGeneratedColumn({ name: 'room_id' })
	id: number;

	@ManyToOne(() => User, (user) => user.rooms)
	user1: User;

	@ManyToOne(() => User, (user) => user.rooms)
	user2: User;

	@OneToMany(() => Message, (message) => message.room)
	messages: Message[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}

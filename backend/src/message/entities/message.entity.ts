import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/user/entities/user.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Message {
	@PrimaryGeneratedColumn({ name: 'message_id' })
	id: number;

	@ManyToOne(() => User, (user) => user.messages)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => Room, (room) => room.messages)
	@JoinColumn({ name: 'room_id' })
	room: Room;

	@Column()
	text: string;

	@Column()
	imagesUrl: string;

	@Column()
	audioUrl: string;

	@Column()
	status: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}

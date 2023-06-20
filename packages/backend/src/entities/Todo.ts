import { PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, Entity } from 'typeorm';

// eslint-disable-next-line import/no-cycle
import User from './User';

@Entity()
export default class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  complete: boolean;

  @Column()
  access: 'public' | 'private';

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}

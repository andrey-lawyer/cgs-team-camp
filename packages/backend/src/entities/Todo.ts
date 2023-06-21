import { PrimaryGeneratedColumn, Column, BaseEntity, Entity } from 'typeorm';

// eslint-disable-next-line import/no-cycle

import { Test } from '../types/todos.type';

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
  access: Test;
}

import { getConnection } from 'typeorm';
import { Request } from 'express';
import Todo from '../entities/Todo';
// import { EntityManager } from 'typeorm';

import { ITodo } from '../types/todos.type';

export default class TodoService {
  async findAllTodos(req: Request) {
    const newConnection = getConnection();
    const todoRepository = newConnection.getRepository(Todo);

    const data = req.user
      ? await todoRepository.find()
      : await todoRepository.find({ where: { access: 'public' } });
    return data;
  }

  async getOneTodo(todoId: string) {
    const newConnection = getConnection();
    const todoRepository = newConnection.getRepository(Todo);
    const oneTodo = await todoRepository.findOne({ where: { id: todoId } });
    return oneTodo;
  }

  async addTodo(newTodo: ITodo) {
    const newConnection = await getConnection();
    const todoRepository = newConnection.getRepository(Todo);
    const data = await todoRepository.save(newTodo);
    return data;
  }

  async removeTodo(todoId: string) {
    const newConnection = getConnection();
    const todoRepository = newConnection.getRepository(Todo);

    const removeTodo = await todoRepository.delete({ id: todoId });

    return removeTodo;
  }

  async updateTodo(todo: ITodo, todoId: string) {
    const newConnection = getConnection();
    const todoRepository = newConnection.getRepository(Todo);

    const updateTodo = await todoRepository.update({ id: todoId }, { ...todo });

    return updateTodo;
  }
}

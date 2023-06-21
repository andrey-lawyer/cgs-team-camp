import { getConnection } from 'typeorm';
import Todo from '../entities/Todo';
// import { EntityManager } from 'typeorm';

import { ITodo } from '../types/todos.type';
import { HttpError } from '../helpers/errors';

export default class TodoService {
  async findAllTodos() {
    const newConnection = getConnection();
    const todoRepository = newConnection.getRepository(Todo);
    const data = await todoRepository.find();
    return data;
  }

  async getOneTodo(todoId: string) {
    const newConnection = getConnection();
    const todoRepository = newConnection.getRepository(Todo);
    const oneTodo = await todoRepository.findOne({ where: { id: todoId } });
    if (!oneTodo) {
      throw new HttpError('Not found', 404);
    }
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
    if (!removeTodo) {
      throw new HttpError('The todo does not exist', 204);
    }
    return removeTodo;
  }

  async updateTodo(todo: ITodo, todoId: string) {
    const newConnection = getConnection();
    const todoRepository = newConnection.getRepository(Todo);

    const updateTodo = await todoRepository.update({ id: todoId }, { ...todo });
    if (!updateTodo) {
      throw new HttpError('The todo was not found', 404);
    }
    return updateTodo;
  }
}

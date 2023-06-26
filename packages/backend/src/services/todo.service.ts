import { getConnection } from 'typeorm';
import Todo from '../entities/Todo';

import { ITodo } from '../types/todos.type';
import { IGetUserAuthInfoRequest, IUser } from '../types/user.types';

export default class TodoService {
  async findAllTodos(req: IGetUserAuthInfoRequest) {
    const newConnection = getConnection();
    const todoRepository = newConnection.getRepository(Todo);

    const data = req.user
      ? await todoRepository.find({})
      : await todoRepository.find({ where: { access: 'public' } });
    return data;
  }

  async getOneTodo(todoId: string) {
    const newConnection = getConnection();
    const todoRepository = newConnection.getRepository(Todo);
    const oneTodo = await todoRepository.findOne({ where: { id: todoId } });
    return oneTodo;
  }

  async addTodo(newTodo: ITodo, user: IUser) {
    const newConnection = await getConnection();
    const todoRepository = newConnection.getRepository(Todo);
    const data = await todoRepository.save({ ...newTodo, user });
    return data;
  }

  async removeTodo(req: IGetUserAuthInfoRequest, todoId: string) {
    const { user } = req;
    const newConnection = getConnection();
    const todoRepository = newConnection.getRepository(Todo);
    const findUser = await todoRepository.findOneBy({
      user: {
        id: user.id
      }
    });
    if (!findUser) throw new Error('you do not have rights to this operation');
    const removeTodo = await todoRepository.delete({ id: todoId });
    return removeTodo;
  }

  async updateTodo(req: IGetUserAuthInfoRequest, todo: ITodo, todoId: string) {
    const { user } = req;
    const newConnection = getConnection();
    const todoRepository = newConnection.getRepository(Todo);
    const findUser = await todoRepository.findOneBy({
      user: {
        id: user.id
      }
    });
    if (!findUser) throw new Error('you do not have rights to this operation');
    const updateTodo = await todoRepository.update({ id: todoId }, { ...todo });

    return updateTodo;
  }
}

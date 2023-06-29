import { In, getConnection } from 'typeorm';
import Todo from '../entities/Todo';

import { ITodo } from '../types/todos.type';
import { IGetUserAuthInfoRequest, IUser } from '../types/user.types';

export default class TodoService {
  async findAllTodos(req: IGetUserAuthInfoRequest) {
    const newConnection = getConnection();
    const todoRepository = newConnection.getRepository(Todo);
    const { search, status, access } = req.query;

    const statusBoolean = status === 'done' ? true : false;

    const newAccess = access ? [access] : ['public', 'private'];
    const newStatus = status ? [statusBoolean] : [true, false];

    if (!req.user) {
      if (search) {
        return await todoRepository.findBy({
          access: 'public',
          complete: In(newStatus),
          title: In([search])
        });
      }
      return await todoRepository.findBy({
        access: 'public',
        complete: In(newStatus)
      });
    }

    let data: Todo[];

    if (search) {
      data = await todoRepository.findBy({
        access: In(newAccess),
        complete: In(newStatus),
        title: In([search])
      });
    } else {
      data = await todoRepository.findBy({
        access: In(newAccess),
        complete: In(newStatus)
      });
    }

    if (data.length > 0) {
      const newData = data.filter((el: any) => {
        console.log(el);
        if (el.idUser == req.user.id) {
          return el;
        }
        if (el.access === 'public') return el;
      });
      return newData;
    }
    return data;
  }

  async getOneTodo(todoId: string) {
    const newConnection = getConnection();
    const todoRepository = newConnection.getRepository(Todo);
    const oneTodo = await todoRepository.findOne({ where: { id: todoId } });
    return oneTodo;
  }

  async addTodo(todo: ITodo, user: IUser) {
    const newConnection = await getConnection();
    const todoRepository = newConnection.getRepository(Todo);
    const newTodo = { ...todo, idUser: user.id };

    const data = await todoRepository.save(newTodo);
    return data;
  }

  async removeTodo(req: IGetUserAuthInfoRequest, todoId: string) {
    const { user } = req;
    const newConnection = getConnection();
    const todoRepository = newConnection.getRepository(Todo);
    const findUser = await todoRepository.findOneBy({
      idUser: user.id
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
      idUser: user.id
    });
    if (!findUser) throw new Error('you do not have rights to this operation');
    const updateTodo = await todoRepository.update({ id: todoId }, { ...todo });

    return updateTodo;
  }
}

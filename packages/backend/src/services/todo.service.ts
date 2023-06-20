import { getConnection } from 'typeorm';
import Todo from '../entities/Todo';
// import { EntityManager } from 'typeorm';

import { ITodo } from '../types/todos.type';

export default class TodoService {
  async findAllTodos() {
    const newConnection = getConnection();
    const todoRepository = newConnection.getRepository(Todo);
    try {
      const data = await todoRepository.find();
      // newConnection.close();
      // console.log(data);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return console.log(err.message);
      }
      console.log(err);
    }
  }

  async getOneTodo(todoId: string) {
    const newConnection = getConnection();
    const todoRepository = newConnection.getRepository(Todo);
    try {
      // const oneTodo = await todoRepository.findOneBy({ id: postId });
      const oneTodo = await todoRepository.findOne({ where: { id: todoId } });
      // console.log(oneTodo);
      return oneTodo;
    } catch (err) {
      if (err instanceof Error) {
        return console.log(err.message);
      }
      console.log(err);
    }
  }

  async addTodo(newTodo: ITodo) {
    const newConnection = await getConnection();
    const todoRepository = newConnection.getRepository(Todo);
    try {
      const data = await todoRepository.save(newTodo);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return console.log(err.message);
      }
      console.log(err);
    }
  }

  async removeTodo(todoId: string) {
    const newConnection = getConnection();
    const todoRepository = newConnection.getRepository(Todo);
    try {
      // const oneTodo = await todoRepository.findOneBy({ id: postId });
      const removeTodo = await todoRepository.delete({ id: todoId });

      // console.log(oneTodo);
      return removeTodo;
    } catch (err) {
      if (err instanceof Error) {
        return console.log(err.message);
      }
      console.log(err);
    }
  }

  async updateTodo(todo: ITodo, todoId: string) {
    const newConnection = getConnection();
    const todoRepository = newConnection.getRepository(Todo);
    try {
      const updateTodo = await todoRepository.update({ id: todoId }, { ...todo });
      // console.log(updateTodo);

      return updateTodo;
    } catch (err) {
      if (err instanceof Error) {
        return console.log(err.message);
      }
      console.log(err);
    }
  }
}

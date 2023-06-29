import { ITodo } from '../common/types/todo.types';
import { APP_KEYS } from '../common/consts';
import { HttpService } from './htpp';

export class TodoService extends HttpService {
  constructor() {
    super();
  }
  async getAllTodos(urlTodo: string) {
    const { data } = await this.get({
      url: urlTodo
    });
    return data;
  }
  async postAddTodo(newTodo: ITodo) {
    const { data } = await this.post({
      url: APP_KEYS.QUERY_KEYS.TODOS,
      data: newTodo
    });
    return data;
  }

  async getTodoId(idTodo: string) {
    const { data } = await this.get({
      url: `${APP_KEYS.QUERY_KEYS.TODOS}/${idTodo}`
    });
    return data;
  }

  async updateTodoId(idTodo: string, todo: ITodo) {
    const { data } = await this.put({
      url: `${APP_KEYS.QUERY_KEYS.TODOS}/${idTodo}`,
      data: todo
    });
    return data;
  }

  async deleteTodoId(idTodo: string) {
    const { data } = await this.delete({
      url: `${APP_KEYS.QUERY_KEYS.TODOS}/${idTodo}`
    });
    return data;
  }
}

export const apiTodos = new TodoService();

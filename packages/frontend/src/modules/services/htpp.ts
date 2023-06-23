import axios from 'axios';
import { ITodo } from '../common/types/todo.types';
import { APP_KEYS } from '../common/consts';

axios.defaults.baseURL = ' http://localhost:5000/api/';

export class ApiTodos {
  async getAllTodos() {
    const { data } = await axios.get(APP_KEYS.QUERY_KEYS.TODOS);
    return data;
  }
  async postAddTodo(newTodo: ITodo) {
    const { data } = await axios.post(APP_KEYS.QUERY_KEYS.TODOS, newTodo);
    return data;
  }
  async getTodoId(idTodo: string) {
    const { data } = await axios.get(`${APP_KEYS.QUERY_KEYS.TODOS}/${idTodo}`);
    return data;
  }
  async deleteTodoId(idTodo: string) {
    const { data } = await axios.delete(`${APP_KEYS.QUERY_KEYS.TODOS}/${idTodo}`);
    return data;
  }
  async updateTodoId(idTodo: string, todo: ITodo) {
    const { data } = await axios.put(`${APP_KEYS.QUERY_KEYS.TODOS}/${idTodo}`, todo);
    return data;
  }
}

import { Response, Request } from 'express';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(_: Request, res: Response) {
    const data = await this.todoService.findAllTodos();
    if (data) {
      return res.status(200).json({ data, status: 'success' });
    }
    return res.status(404).json({ status: 'Not found' });
  }

  async getOneTodo(req: Request, res: Response) {
    const id = req.params.todoId;
    const data = await this.todoService.getOneTodo(id);

    if (!data) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.status(200).json(data);
  }

  async addOneTodo(req: Request, res: Response) {
    const newTodo = req.body;
    const data = await this.todoService.addTodo(newTodo);

    if (data) return res.status(201).json({ data, status: 'success' });
    return res.status(404).json({ status: 'Not found' });
  }

  async deleteTodoId(req: Request, res: Response) {
    const id = req.params.todoId;
    const data = await this.todoService.removeTodo(id);

    // console.log(data);
    if (data) {
      return res.status(200).json({ massage: `todo with id ${id} was removed` });
    }
    return res.status(204).json({ message: 'The todo does not exist' });
  }

  async updateTodoId(req: Request, res: Response) {
    const id = req.params.todoId;
    const todo = req.body;

    const data = await this.todoService.updateTodo(todo, id);

    // console.log(data);

    if (data) {
      return res.status(200).json({ massage: `todo with id ${id} was updated` });
    }
    return res.status(404).json({ message: 'The todo was not found' });
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;

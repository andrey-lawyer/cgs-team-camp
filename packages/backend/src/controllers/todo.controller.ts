import { Response, Request } from 'express';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(req: Request, res: Response) {
    const data = await this.todoService.findAllTodos(req);

    res.status(200).json({ data, status: 'success' });
  }

  async getOneTodo(req: Request, res: Response) {
    const id = req.params.todoId;
    const data = await this.todoService.getOneTodo(id);
    res.status(200).json(data);
  }

  async addOneTodo(req: Request, res: Response) {
    const newTodo = req.body;
    const data = await this.todoService.addTodo(newTodo);
    res.status(201).json({ data, status: 'success' });
  }

  async deleteTodoId(req: Request, res: Response) {
    const id = req.params.todoId;
    await this.todoService.removeTodo(id);
    return res.status(200).json({ massage: `todo with id ${id} was removed` });
  }

  async updateTodoId(req: Request, res: Response) {
    const id = req.params.todoId;
    const todo = req.body;
    await this.todoService.updateTodo(todo, id);
    res.status(200).json({ massage: `todo with id ${id} was updated` });
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;

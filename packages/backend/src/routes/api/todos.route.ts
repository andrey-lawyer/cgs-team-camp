import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import IsExist from '../../middleware/validation';

const todosRouter: Router = Router();
const isExist = new IsExist();

todosRouter.get('/', todoController.getAllTodo.bind(todoController));
// todosRouter.post('/', todoController.addOneTodo.bind(todoController));
todosRouter.post('/', isExist.addTodoValidation, todoController.addOneTodo.bind(todoController));
todosRouter.get('/:todoId', todoController.getOneTodo.bind(todoController));
todosRouter.delete('/:todoId', todoController.deleteTodoId.bind(todoController));
todosRouter.put(
  '/:todoId',
  isExist.updateTodoValidation,
  todoController.updateTodoId.bind(todoController)
);

export default todosRouter;

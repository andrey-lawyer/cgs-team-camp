import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import IsValidate from '../../middleware/validation';
import { isExist } from '../../middleware/isExist';

const todosRouter: Router = Router();
const isValidate = new IsValidate();

todosRouter.get('/', isExist(todoController.getAllTodo.bind(todoController)));
todosRouter.post(
  '/',
  isValidate.addTodoValidation,
  isExist(todoController.addOneTodo.bind(todoController))
);
todosRouter.get('/:todoId', isExist(todoController.getOneTodo.bind(todoController)));
todosRouter.delete('/:todoId', isExist(todoController.deleteTodoId.bind(todoController)));
todosRouter.put(
  '/:todoId',
  isValidate.updateTodoValidation,
  isExist(todoController.updateTodoId.bind(todoController))
);

export default todosRouter;

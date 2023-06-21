import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import IsValidate from '../../middleware/validation';
import { tryCatch } from '../../middleware/tryCatch';
import { isExist } from '../../middleware/isExist';

const todosRouter: Router = Router();
const isValidate = new IsValidate();

todosRouter.get('/', tryCatch(todoController.getAllTodo.bind(todoController)));
todosRouter.post(
  '/',
  isValidate.addTodoValidation,
  tryCatch(todoController.addOneTodo.bind(todoController))
);

todosRouter.use(isExist);
todosRouter.get('/:todoId', tryCatch(todoController.getOneTodo.bind(todoController)));
todosRouter.delete('/:todoId', tryCatch(todoController.deleteTodoId.bind(todoController)));
todosRouter.put(
  '/:todoId',
  isValidate.updateTodoValidation,
  tryCatch(todoController.updateTodoId.bind(todoController))
);

export default todosRouter;

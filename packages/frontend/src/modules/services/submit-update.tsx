import { IForm, IUpdateTodo } from '../common/types/formik.types';
import { ITodoCheck } from '../common/types/todo.types';

const onUpdate = (todo: IUpdateTodo, mutate: Function) => {
  mutate(todo);
};

export const onSubmitUpdate = (
  values: IForm,
  todo: ITodoCheck,
  onClose: Function,
  mutate: Function
) => {
  const complete = values.complete === 'done' ? true : false;
  const updateTodo = { ...values, id: todo.id, complete };
  onUpdate(updateTodo, mutate);
  onClose();
};

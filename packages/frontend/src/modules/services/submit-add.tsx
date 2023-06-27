import { IForm } from '../common/types/formik.types';
import { ITodo} from '../common/types/todo.types';

const onAdd = (todo: ITodo, mutate: Function) => {
  mutate(todo);
};

export const onSubmitAdd = (values: IForm, onClose: Function, mutate: Function) => {
  const complete = values.complete === 'done' ? true : false;
  const addTodo = { ...values, complete };
  onAdd(addTodo, mutate);
  onClose();
};

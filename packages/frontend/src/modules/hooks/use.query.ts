import { useMutation } from 'react-query';
import { queryClient } from '../app';
import { ApiTodos } from '../services/htpp';
import { IUpdateTodo } from '../common/types/formik.types';
import { ITodo } from '../common/types/todo.types';

const apiTodos = new ApiTodos();
export const useMutationUpdate = () => {
  const { mutate } = useMutation(
    ({ id, description, title, complete, access }: IUpdateTodo) =>
      apiTodos.updateTodoId(id, { description, title, complete, access }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      }
    }
  );
  return { mutate };
};

export const useMutationAdd = () => {
  const { mutate } = useMutation((todo: ITodo) => apiTodos.postAddTodo(todo), {
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });
  return { mutate };
};

export const useMutationDElete = () => {
  const { mutate } = useMutation((id: string) => apiTodos.deleteTodoId(id), {
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });
  return { mutate };
};

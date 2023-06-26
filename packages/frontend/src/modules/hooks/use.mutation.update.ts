import { useMutation } from 'react-query';
import { queryClient } from '../app';
import { IUpdateTodo } from '../common/types/formik.types';
import { apiTodos } from '../services/todo.api';

export const useMutationUpdate = () => {
  const mutation = useMutation(
    ({ id, description, title, complete, access }: IUpdateTodo) =>
      apiTodos.updateTodoId(id, { description, title, complete, access }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      }
    }
  );
  return { mutation };
};

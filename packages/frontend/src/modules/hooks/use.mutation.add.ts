import { useMutation } from 'react-query';
import { ITodo } from '../common/types/todo.types';
import { queryClient } from '../app';
import { apiTodos } from '../services/todo.api';

export const useMutationAdd = () => {
  const mutation = useMutation((todo: ITodo) => apiTodos.postAddTodo(todo), {
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });
  return { mutation };
};

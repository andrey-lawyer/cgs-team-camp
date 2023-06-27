import { useMutation } from 'react-query';
import { apiTodos } from '../services/todo.api';
import { queryClient } from '../app';
export const useMutationDelete = () => {
  const mutation = useMutation((id: string) => apiTodos.deleteTodoId(id), {
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });
  return { mutation };
};

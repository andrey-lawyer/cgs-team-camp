import { useQuery } from 'react-query';
import { iQueryId } from '../common/types/query.types';
import { apiTodos } from '../services/todo.api';
import { APP_KEYS } from '../common/consts';

export const useGetTodoId = (todosId: string) => {
  const query: iQueryId = useQuery({
    queryKey: [APP_KEYS.QUERY_KEYS.TODOID],
    queryFn: async () => {
      const response = await apiTodos.getTodoId(todosId);
      return response;
    }
  });
  return { query };
};

import { useQuery } from 'react-query';
import { APP_KEYS } from '../common/consts';
import { iQuery } from '../common/types/query.types';
import { apiTodos } from '../services/todo.api';

export const useGetAllTodos = (api = APP_KEYS.QUERY_KEYS.TODOS) => {
  const query: iQuery = useQuery({
    queryKey: [api],
    queryFn: async () => {
      const response = await apiTodos.getAllTodos(api);
      return response;
    }
  });
  return { query };
};

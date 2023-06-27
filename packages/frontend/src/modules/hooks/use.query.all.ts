import { useQuery } from 'react-query';
import { APP_KEYS } from '../common/consts';
import { iQuery } from '../common/types/query.types';
import { apiTodos } from '../services/todo.api';

export const useGetAllTodos = () => {
  const query: iQuery = useQuery({
    queryKey: [APP_KEYS.QUERY_KEYS.TODOS],
    queryFn: async () => {
      const response = await apiTodos.getAllTodos();
      return response;
    }
  });
  return { query };
};

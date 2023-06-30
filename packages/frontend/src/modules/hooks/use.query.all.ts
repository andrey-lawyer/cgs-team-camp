import { useQuery } from 'react-query';
import { APP_KEYS } from '../common/consts';
import { iQuery } from '../common/types/query.types';
import { apiTodos } from '../services/todo.api';
import { useState } from 'react';
import { ITodoCheck } from '../common/types/todo.types';

export const useGetAllTodos = (api = APP_KEYS.QUERY_KEYS.TODOS, page = 1) => {
  const [todos, setTodos] = useState<ITodoCheck[]>([]);

  const newPage = api === APP_KEYS.QUERY_KEYS.TODOS ? `?page=${page}` : `&page=${page}`;
  const query: iQuery = useQuery({
    queryKey: [api, page],
    queryFn: async () => {
      const response = await apiTodos.getAllTodos(api + newPage);

      if (response) {
        setTodos((prevState) => [...prevState, ...response.data]);
      }
      return response;
    }
  });

  return { query, todos };
};

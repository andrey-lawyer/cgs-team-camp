import React, { useContext, useState, useEffect } from 'react';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useScreen } from '../../../hooks/use.screen';
import { Box, Button } from '@material-ui/core';
import { ModalContext } from '../modal-context';
import { ModalForm } from '../modal-form';
import { Portal } from '../portal';
import { TodoElementTab } from '../todo-element-tab';
import { TodoElementDesk } from '../todo-element-desc';
import { Table, List, Item } from './todo.list.styled';
import { useGetAllTodos } from '../../../hooks/use.query.all';
import { TodoElementMob } from '../todo-element-mob';
import { IsLoggedInContext } from '../isloggedin-context';
import { Loader } from '../loader';
import { notify } from '../../../services/toast';
import { SearchForm } from '../search-form';
import { apiTodos } from '../../../services/todo.api';

export const TodoList = () => {
  const { isLoggedIn } = useContext(IsLoggedInContext);
  const { isMobile, isTablet, isDesk } = useScreen();
  const { modal, open, close } = useContext(ModalContext);

  const [isAllTodo, setIsAllTodo] = useState(true);
  const [clickSearch, setClickSearch] = useState(false);
  const [dataSearchUser, setDataSearchUser] = useState([]);

  const [queryString, setQueryString] = useState('');

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const response = await apiTodos.getAllTodos(queryString);
        setDataSearchUser(response.data);
      } catch (err) {
        notify();
      }
    };
    if (queryString) fetchSearch();
  }, [clickSearch, queryString]);

  const {
    query: { isLoading, error, data }
  } = useGetAllTodos();
  if (!data) return <div>Loading...</div>;

  if (error) notify();

  const showTodo = isAllTodo ? data.data : dataSearchUser;

  return (
    <>
      {isLoading && <Loader />}
      {showTodo && (
        <>
          <SearchForm
            setIsAllTodo={setIsAllTodo}
            setClickSearch={setClickSearch}
            setQueryString={setQueryString}
          />
          <Box textAlign={'center'} mt="20px">
            <Button
              onClick={() => {
                setIsAllTodo(true);
                setQueryString('');
              }}
              variant="contained"
              color="primary"
            >
              Show all
            </Button>
          </Box>
          {isMobile && (
            <Box mt="20px">
              <List>
                {showTodo.map((todo) => (
                  <Item key={todo.id}>
                    <TodoElementMob todo={todo} />
                  </Item>
                ))}
              </List>
            </Box>
          )}
          {isTablet && (
            <Box bgcolor="#00bfff" pt={'20px'} mt="20px">
              <Carousel showArrows={true}>
                {showTodo.map((todo) => (
                  <div key={todo.id}>
                    <TodoElementTab todo={todo} />
                  </div>
                ))}
              </Carousel>
            </Box>
          )}
          {isDesk && (
            <Table>
              <thead>
                <tr>
                  <th>Todo Title</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {showTodo.map((todo) => (
                  <tr key={todo.id}>
                    <TodoElementDesk todo={todo} />
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {isLoggedIn && (
            <Box textAlign={'center'} mt="20px">
              <Button onClick={open} variant="contained" color="primary">
                Add
              </Button>
            </Box>
          )}
          {modal && (
            <Portal onClose={close}>
              <ModalForm onClose={close} type="add" />
            </Portal>
          )}
        </>
      )}
    </>
  );
};

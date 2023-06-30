import React, { useContext, useRef, useState, useEffect } from 'react';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useScreen } from '../../../hooks/use.screen';
import { Box, Button, Typography } from '@material-ui/core';
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
import { Pagination as PaginationMaterial } from '@mui/material';
import { APP_KEYS } from '../../consts';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const TodoList = () => {
  const { isLoggedIn } = useContext(IsLoggedInContext);
  const { isMobile, isTablet, isDesk } = useScreen();
  const { modal, open, close } = useContext(ModalContext);

  const [queryString, setQueryString] = useState('');

  const [page, setPage] = useState(1);

  const {
    query: { isLoading, error, data },
    todos
  } = queryString
    ? useGetAllTodos(queryString, page)
    : useGetAllTodos(APP_KEYS.QUERY_KEYS.TODOS, page);

  if (!data) return <div>Loading...</div>;

  const showTodo = data.data;

  if (error) notify();

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      {isLoading && <Loader />}
      {showTodo && (
        <>
          {isDesk && <PaginationMaterial count={10} page={page} onChange={handleChangePage} />}
          <SearchForm setQueryString={setQueryString} />
          <Box textAlign={'center'} mt="20px">
            <Button
              onClick={() => {
                setQueryString('');
              }}
              variant="contained"
              color="primary"
            >
              Show all
            </Button>
          </Box>
          {isLoggedIn && (
            <Box textAlign={'center'} mt="20px" mb="20px">
              <Button onClick={open} variant="contained" color="primary">
                Add Todo
              </Button>
            </Box>
          )}
          {isMobile && (
            <div
              id="scrollableDiv"
              style={{
                height: 160,
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse'
              }}
            >
              <InfiniteScroll
                dataLength={todos.length}
                next={() => setPage((prevState) => prevState + 1)}
                style={{ display: 'flex', flexDirection: 'column-reverse' }}
                inverse={true} //
                hasMore={true}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
              >
                <Box mt="20px">
                  <List>
                    {todos.map((todo) => (
                      <Item key={todo.id}>
                        <TodoElementMob todo={todo} />
                      </Item>
                    ))}
                  </List>
                </Box>
              </InfiniteScroll>
            </div>
          )}
          {isTablet && (
            <Box bgcolor="#00bfff" pt={'20px'} mt="20px" pb={'20px'}>
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={100}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onReachEnd={() => setPage((prevState) => prevState + 1)}
              >
                {todos.map((todo) => (
                  <SwiperSlide key={todo.id}>
                    <TodoElementTab todo={todo} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          )}
          {isDesk && (
            <>
              {showTodo.length === 0 ? (
                <Typography variant="h1" component="h2">
                  There is no todo here
                </Typography>
              ) : (
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
            </>
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

import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import { useQuery } from 'react-query';
import { ApiTodos } from '../services/htpp';
import { iQueryId } from '../common/types/query.types';
import { Button } from '@mui/material';
import { ModalContext } from '../common/components/modal-context';
import { Portal } from '../common/components/portal';
import { ModalForm } from '../common/components/modal-form';
import { Box } from '@material-ui/core';

const apiTodos = new ApiTodos();

const TodoIdContainer = () => {
  const { todosId } = useParams();
  if (!todosId) return <div>is loading...</div>;

  const { isLoading, error, data }: iQueryId = useQuery(APP_KEYS.QUERY_KEYS.TODOID, () =>
    apiTodos.getTodoId(todosId)
  );

  const { modal, open, close } = useContext(ModalContext);

  return (
    <>
      {data && (
        <Box bgcolor="blue" padding={'15px'} color="white" borderRadius="10px" mt="20px">
          <h1>Todo {data.title}</h1>
          <p>Description: {data.description}</p>
          <p>Complete: {data.complete ? 'done' : 'in progress'}</p>
          <p>Access: {data.access}</p>
          <Box textAlign={'center'} mt="10px">
            <Button onClick={open} variant="contained">
              Update
            </Button>
          </Box>

          {modal && (
            <Portal onClose={close}>
              <ModalForm onClose={close} type="update" todo={data} />
            </Portal>
          )}
        </Box>
      )}
    </>
  );
};

export default TodoIdContainer;

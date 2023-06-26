import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { ModalContext } from '../common/components/modal-context';
import { Portal } from '../common/components/portal';
import { ModalForm } from '../common/components/modal-form';
import { Box } from '@material-ui/core';
import { useGetTodoId } from '../hooks/use.query.id';

const TodoIdContainer = () => {
  const { todosId } = useParams();
  if (!todosId) return <div>is loading...</div>;

  const {
    query: { isLoading, error, data }
  } = useGetTodoId(todosId);

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

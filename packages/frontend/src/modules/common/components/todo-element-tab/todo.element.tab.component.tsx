import React, { FC, useContext } from 'react';
import { useMutationDelete } from '../../../hooks/use.mutation.delete';
import { ITodoProps } from '../../types/props.types';
import { APP_KEYS } from '../../consts';
import { Box } from '@material-ui/core';
import { ButtonDel, ButtonView } from './todo.element.tab.styled';
import { IsLoggedInContext } from '../isloggedin-context';

export const TodoElementTab: FC<ITodoProps> = ({
  todo: { id, title, description, complete, access }
}) => {
  const { isLoggedIn } = useContext(IsLoggedInContext);
  const {
    mutation: { mutate }
  } = useMutationDelete();
  const onDelete = (id: string) => {
    mutate(id);
  };
  return (
    <Box pb="40px" minWidth={300} textAlign={'center'} p="10px">
      <h2> Title: {title}</h2>
      <p>Description: {description}</p>
      <Box mt={'10px'} mb="10px">
        <ButtonView to={`${APP_KEYS.ROUTER_KEYS.TODOS}/${id}`}>view</ButtonView>
        {isLoggedIn && <ButtonDel onClick={() => onDelete(id)}>delete</ButtonDel>}
      </Box>
    </Box>
  );
};

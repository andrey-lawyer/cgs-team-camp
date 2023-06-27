import React, { FC } from 'react';
import { useMutationDelete } from '../../../hooks/use.mutation.delete';
import { ITodoProps } from '../../types/props.types';
import { APP_KEYS } from '../../consts';
import { Box } from '@material-ui/core';
import { ButtonDel, ButtonView } from './todo.element.tab.styled';

export const TodoElementTab: FC<ITodoProps> = ({
  todo: { id, title, description, complete, access }
}) => {
  const {
    mutation: { mutate }
  } = useMutationDelete();
  const onDelete = (id: string) => {
    mutate(id);
  };
  return (
    <Box pb="40px">
      <h2> Title: {title}</h2>
      <p>Description: {description}</p>
      <Box display={'flex'} justifyContent={'space-around'}>
        <ButtonView to={`${APP_KEYS.ROUTER_KEYS.TODOS}/${id}`}>view</ButtonView>
        <ButtonDel onClick={() => onDelete(id)}>delete</ButtonDel>
      </Box>
    </Box>
  );
};

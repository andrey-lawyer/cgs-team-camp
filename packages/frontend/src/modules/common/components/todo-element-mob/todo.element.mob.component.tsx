import React, { FC } from 'react';
import { ITodoProps } from '../../types/props.types';
import { Link } from 'react-router-dom';
import { APP_KEYS } from '../../consts';
import { useMutationDelete } from '../../../hooks/use.mutation.delete';
import { Box } from '@material-ui/core';
import { ButtonView, ButtonDel } from './todo.element.mob.styled';

export const TodoElementMob: FC<ITodoProps> = ({
  todo: { id, title, description, complete, access }
}) => {
  const {
    mutation: { mutate }
  } = useMutationDelete();
  const onDelete = (id: string) => {
    mutate(id);
  };

  return (
    <Box display={'flex'} flexDirection={'column'} gridGap={'2px'} alignItems={'center'}>
      <h3>{title}</h3>
      <p>{description}</p>
      <ButtonView to={`${APP_KEYS.ROUTER_KEYS.TODOS}/${id}`}>view</ButtonView>
      <ButtonDel onClick={() => onDelete(id)}>delete</ButtonDel>
    </Box>
  );
};

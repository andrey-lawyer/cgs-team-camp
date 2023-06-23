import React, { FC } from 'react';
import { ITodoProps } from '../../types/props.types';
import { APP_KEYS } from '../../consts';
import { useMutationDElete } from '../../../hooks/use.query';
import { ButtonDel, ButtonView, Cell } from './todo.element.desk.styled';
export const TodoElementDesk: FC<ITodoProps> = ({
  todo: { id, title, description, complete, access }
}) => {
  const { mutate } = useMutationDElete();
  const onDelete = (id: string) => {
    mutate(id);
  };
  return (
    <>
      <td>{title}</td>
      <td>{description}</td>
      <Cell>
        <ButtonView to={`${APP_KEYS.ROUTER_KEYS.TODOS}/${id}`}>view</ButtonView>
        <ButtonDel onClick={() => onDelete(id)}>delete</ButtonDel>
      </Cell>
    </>
  );
};

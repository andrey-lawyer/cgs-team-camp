import React, { FC, useContext } from 'react';
import { ITodoProps } from '../../types/props.types';
import { APP_KEYS } from '../../consts';
import { useMutationDelete } from '../../../hooks/use.mutation.delete';
import { ButtonDel, ButtonView, Cell } from './todo.element.desk.styled';
import { IsLoggedInContext } from '../isloggedin-context';
export const TodoElementDesk: FC<ITodoProps> = ({
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
    <>
      <td>{title}</td>
      <td>{description}</td>
      <Cell>
        <ButtonView to={`${APP_KEYS.ROUTER_KEYS.TODOS}/${id}`}>view</ButtonView>
        {isLoggedIn && <ButtonDel onClick={() => onDelete(id)}>delete</ButtonDel>}
      </Cell>
    </>
  );
};

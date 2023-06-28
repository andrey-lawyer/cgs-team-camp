import { useMutation } from 'react-query';
import { queryClient } from '../app';
import { IUser } from '../common/types/user.types';
import { apiUser } from '../services/user.api';

export const useMutationUserRegister = () => {
  const mutation = useMutation((user: IUser) => apiUser.registerUser(user), {
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });
  return { mutation };
};

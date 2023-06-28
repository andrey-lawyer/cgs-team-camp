import { useMutation } from 'react-query';
import { queryClient } from '../app';
import { IUser } from '../common/types/user.types';
import { apiUser } from '../services/user.api';

export const useMutationUserChangePassword = () => {
  const mutation = useMutation((user: IUser) => apiUser.changePassword(user), {
    onMutate: (data) => {
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });
  return { mutation };
};

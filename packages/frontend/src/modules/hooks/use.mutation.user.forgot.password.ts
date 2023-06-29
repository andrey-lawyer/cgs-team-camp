import { useMutation } from 'react-query';
import { queryClient } from '../app';
import { IEmail } from '../common/types/user.types';
import { apiUser } from '../services/user.api';

export const useMutationUserForgotPassword = () => {
  const mutation = useMutation((email: IEmail) => apiUser.forgotPassword(email), {
    onMutate: (data) => {
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });
  return { mutation };
};

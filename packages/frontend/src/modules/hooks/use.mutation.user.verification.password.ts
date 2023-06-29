import { useMutation } from 'react-query';
import { queryClient } from '../app';
import { IPassword } from '../common/types/user.types';
import { apiUser } from '../services/user.api';

export const useMutationVerificationPassword = (verificationToken: string) => {
  const mutation = useMutation(
    (password: IPassword) => apiUser.postVerificationPassword(verificationToken, password),
    {
      onMutate: (data) => {
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries();
      }
    }
  );
  return { mutation };
};

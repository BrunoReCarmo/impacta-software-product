import { AxiosError } from 'axios';
import { fetchSignUp } from './service';
import { setCookie } from 'cookies-next';
import { CookiesEnum } from '@common/enums'
import { useMutation } from '@tanstack/react-query';
import { Response } from '@common/models';

export function useSignUp(externalSuccess?: VoidFunction) {
  function onSuccess(data: Response<string>) {
    setCookie(CookiesEnum.Token, data?.data, {
      sameSite: 'strict',
    });
    externalSuccess?.()
  }

  function onError(error: AxiosError) {
    console.log(error, 'error')
  }

  const { mutate, isPending, error } = useMutation({
    mutationFn: fetchSignUp,
    onSuccess,
    onError,
  });

  return { mutate, error, isPending };
}
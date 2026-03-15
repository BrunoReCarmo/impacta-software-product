import { AxiosError } from 'axios';
import { fetchLogin } from './service';
import { setCookie } from 'cookies-next';
import { Response } from '@common/models';
import { CookiesEnum } from '@common/enums'
import { useMutation } from '@tanstack/react-query';

export function useLogin(externalSuccess?: VoidFunction) {
  function onSuccess(data: Response<string>) {
    
    setCookie(CookiesEnum.Token, data?.data);

    externalSuccess?.()
  }

  function onError(error: AxiosError) {
    console.log(error, 'error')
  }

  const { mutate, isPending, error } = useMutation({
    mutationFn: fetchLogin,
    onSuccess,
    onError,
  });

  return { mutate, error, isPending };
}
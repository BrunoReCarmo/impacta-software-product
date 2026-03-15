import axios from 'axios';
import { BackendApiConfig } from '@/api';
import { Response, UserEntity } from '@common/models';
import { UseFetchUserMeQueryKeyProps } from './props';
import { QueryFunctionContext } from '@tanstack/react-query';

export async function fetchUserMe({
  queryKey,
}: QueryFunctionContext<UseFetchUserMeQueryKeyProps>): Promise<UserEntity> {
  const api = BackendApiConfig.base;
  const headers = BackendApiConfig.headers;

  const response = await axios.get<Response<UserEntity>>(`${api}/user/me`, {
    headers,
  });

  return response.data.data;
}

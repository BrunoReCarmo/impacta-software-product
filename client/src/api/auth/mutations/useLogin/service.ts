import axios from 'axios';
import { BackendApiConfig } from '@/api';
import { LoginInputDTO } from '@common/dto';
import { Response } from '@common/models';

export async function fetchLogin({
  email,
  password,
}: LoginInputDTO) {
    const api = BackendApiConfig.base;
    const headers = BackendApiConfig.headers;

  const response = await axios.post<Response<string>>(
    `${api}/iam/login`,
    {
      email,
      password,
    },
    { headers }
  );

  return response.data;
}

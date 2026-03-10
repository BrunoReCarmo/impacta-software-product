import axios from 'axios';
import { BackendApiConfig } from '@/api';
import { LoginInputDTO } from '@common/dto';

export async function fetchLogin({
  email,
  password,
}: LoginInputDTO) {
    const api = BackendApiConfig.base;
    const headers = BackendApiConfig.headers;

  const response = await axios.post<string>(
    `${api}/iam/login`,
    {
      email,
      password,
    },
    { headers }
  );

  return response.data;
}

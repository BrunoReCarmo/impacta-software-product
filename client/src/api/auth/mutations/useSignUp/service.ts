import axios from 'axios';
import { BackendApiConfig } from '@/api';
import { SignUpInputDTO } from '@common/dto';

export async function fetchSignUp({
  name,
  email,
  password,
}: SignUpInputDTO) {
    const api = BackendApiConfig.base;
    const headers = BackendApiConfig.headers;

  const response = await axios.post<string>(
    `${api}/iam/sign-up`,
    {
      name,
      email,
      password,
    },
    { headers }
  );

  return response.data;
}

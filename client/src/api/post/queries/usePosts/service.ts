import axios from 'axios';
import { BackendApiConfig } from '@/api';
import { PostEntity, Response } from '@common/models';

export async function fetchPosts(): Promise<Array<PostEntity>> {
  const api = BackendApiConfig.base;
  const headers = BackendApiConfig.headers;

  const response = await axios.get<Response<Array<PostEntity>>>(`${api}/post`, {
    headers,
  });

  return response.data.data;
}

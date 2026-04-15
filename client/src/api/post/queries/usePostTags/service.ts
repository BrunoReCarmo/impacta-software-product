import axios from 'axios';
import { BackendApiConfig } from '@/api';
import { PostTagsEntity, Response } from '@common/models';

export async function fetchPostsTag(): Promise<Array<PostTagsEntity>> {
  const api = BackendApiConfig.base;
  const headers = BackendApiConfig.headers;

  const response = await axios.get<Response<Array<PostTagsEntity>>>(`${api}/post/tags`, {
    headers,
  });

  return response.data.data;
}

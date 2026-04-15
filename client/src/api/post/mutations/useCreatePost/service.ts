import axios from 'axios';
import { BackendApiConfig } from '@/api';
import { Response } from '@common/models';
import { CreatePostInputDTO } from '@common/dto/post-input.dto';

export async function fetchCreatePost({
  body,
  tagsId,
  title
}: CreatePostInputDTO): Promise<Response<string>> {
    const api = BackendApiConfig.base;
    const headers = BackendApiConfig.headers;

  const response = await axios.post<Response<string>>(
    `${api}/post`,
    {
      title,
      body,
      tagsId,
    },
    { headers }
  );

  return response.data;
}

import { AxiosError } from 'axios';
import { Response } from '@common/models';
import { fetchCreatePost } from './service';
import { PostsQueryKey } from '../../queryKeys';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreatePost(externalSuccess?: VoidFunction) {
  const queryClient: QueryClient = useQueryClient();

  function onSuccess(data: Response<string>) {
    queryClient.invalidateQueries({ queryKey: [PostsQueryKey.Posts] });
    externalSuccess?.()
  }

  function onError(error: AxiosError) {
    console.log(error, 'error')
  }

  const { mutate, isPending, error } = useMutation({
    mutationFn: fetchCreatePost,
    onSuccess,
    onError,
  });

  return { mutate, error, isPending };
}
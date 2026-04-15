import { AxiosError } from "axios";
import { fetchPostsTag } from "./service";
import { PostTagsEntity } from "@common/models";
import { PostsQueryKey } from "../../queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseFetchPostsTagQueryKeyProps } from "./props";
import { useUserMe } from "@/api/user/useUserMe";

export function usePostTags() {
  const { isAuthenticated } = useUserMe()
  
  const queryKey: UseFetchPostsTagQueryKeyProps = [PostsQueryKey.PostsTag];

  const { data, error, isPending, refetch, fetchStatus } = useQuery<
    Array<PostTagsEntity>,
    AxiosError,
    Array<PostTagsEntity>,
    UseFetchPostsTagQueryKeyProps
  >({
    queryKey,
    enabled: isAuthenticated,
    queryFn: fetchPostsTag,
  });

  return {
    tags: data,
    error,
    refetch,
    isLoading: isPending && fetchStatus !== "idle",
  };
}

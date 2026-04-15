import { AxiosError } from "axios";
import { fetchPosts } from "./service";
import { PostEntity } from "@common/models";
import { PostsQueryKey } from "../../queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseFetchPostsQueryKeyProps } from "./props";

export function usePosts() {
  const queryKey: UseFetchPostsQueryKeyProps = [PostsQueryKey.Posts];

  const { data, error, isPending, refetch, fetchStatus } = useQuery<
    Array<PostEntity>,
    AxiosError,
    Array<PostEntity>,
    UseFetchPostsQueryKeyProps
  >({
    queryKey,
    queryFn: fetchPosts,
  });

  return {
    data,
    error,
    refetch,
    isLoading: isPending && fetchStatus !== "idle",
  };
}

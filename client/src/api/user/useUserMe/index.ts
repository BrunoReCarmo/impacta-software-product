import { AxiosError } from "axios";
import { fetchUserMe } from "./service";
import { UserEntity } from "@common/models";
import { UserQueryKey } from "../queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseFetchUserMeQueryKeyProps } from "./props";
import { getCookie } from "cookies-next";
import { CookiesEnum } from "@common/enums";

export function useUserMe() {
  const token: string | null = getCookie(CookiesEnum.Token) as string ?? null;
  
  const queryKey: UseFetchUserMeQueryKeyProps = [UserQueryKey.UserMe];

  const { data, error, isPending, refetch, fetchStatus } = useQuery<
    UserEntity,
    AxiosError,
    UserEntity,
    UseFetchUserMeQueryKeyProps
  >({
    queryKey,
    enabled: !!token,
    queryFn: fetchUserMe,
  });

  const isAuthenticated: boolean = !!token && Boolean(data?.name) && !isPending;

  console.log(isAuthenticated, !!token, Boolean(data?.name), !isPending)

  return {
    user: data,
    error,
    refetch,
    isAuthenticated,
    isLoading: isPending && fetchStatus !== "idle",
  };
}

import { useCallback, useMemo } from "react";
import { SearchKeys } from "@/enum/search-keys";
import useSearchParams from "../useSearchParams";
import { AuthType } from "@/components/Auth/Common/props";
import { useLogin, useSignUp } from "@/api/auth/mutations";

export default function useAuthOptions() {
  const search = useSearchParams();
  
  const isRegister: boolean = useMemo(
    () => search?.get(SearchKeys.AuthOptions) === "register",
    [search]
  );

  const { mutate: mutateSignUp, isPending: isPendingSignUp } = useSignUp(() =>
    console.log("external")
  );
  const { mutate: mutateLogin, isPending: isPendingLogin } = useLogin(() =>
    console.log("external")
  );

  const handleMutateAuth = useCallback(
    (data: AuthType) => {
      if (isRegister) {
        mutateSignUp(data);
        return;
      }
      mutateLogin(data);
    },
    [isRegister]
  );

  const isPending = useMemo(
    () => isPendingLogin || isPendingSignUp,
    [isPendingLogin, isPendingSignUp]
  );

  return {
    isPending,
    isRegister,
    handleMutateAuth
  }
}

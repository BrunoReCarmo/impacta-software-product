import { LogOut } from "lucide-react";
import styles from './styles.module.scss'
import { deleteCookie } from "cookies-next";
import { CookiesEnum } from "@common/enums";
import { useRouter } from "next/navigation";
import Button from "@/components/core/Button";
import { UserQueryKey } from "@/api/user/queryKeys";
import { useQueryClient } from "@tanstack/react-query";

export default function Logout() {
  const router = useRouter()

  const queryClient = useQueryClient();

  function handleLogout() {
    deleteCookie(CookiesEnum.Token)

    queryClient.invalidateQueries({
        queryKey: [UserQueryKey.UserMe]
    });
    
    queryClient.removeQueries();

    router.prefetch('/');
    router.replace('/');
    router.refresh()
  }

  return (
      <Button onClick={handleLogout} className={styles.button}>
        <LogOut width={22} />
      </Button>
  );
}

import UserChip from "./User";
import Logout from "./Logout";
import styles from "./styles.module.scss";
import { useUserMe } from "@/api/user/useUserMe";

export function Header() {
  const { isAuthenticated } = useUserMe();

  if (isAuthenticated) {
    return (
      <header className={styles.header}>
        <UserChip />
        <Logout />
      </header>
    );
  }

  return (
    <header className={styles.header}>
      Bruno Blog
    </header>
  );
}

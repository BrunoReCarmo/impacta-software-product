import styles from "./styles.module.scss";
import { useUserMe } from "@/api/user/useUserMe";

export default function UserChip() {
  const { user } = useUserMe();

    return (
      <div className={styles.user}>
        <div className={styles.user__pic}>{user?.name?.slice(0, 1)}</div>
        <span>{user?.name}</span>
      </div>
    );
  
}

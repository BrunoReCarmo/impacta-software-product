import { UserChipProps } from "./props";
import styles from "./styles.module.scss";
import { useUserMe } from "@/api/user/useUserMe";

export default function UserChip({onlyPic = false}: UserChipProps) {
  const { user } = useUserMe();

    return (
      <div className={styles.user}>
        <div className={styles.user__pic}>{user?.name?.slice(0, 1)}</div>
        {!onlyPic && <span>{user?.name}</span>}
      </div>
    );
  
}

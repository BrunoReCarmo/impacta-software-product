import { UserChipProps } from "./props";
import styles from "./styles.module.scss";

export default function UserChip({user, onlyPic = false}: UserChipProps) {

    return (
      <div className={styles.user}>
        <div className={styles.user__pic}>{user?.name?.slice(0, 1)}</div>
        {!onlyPic && <span>{user?.name}</span>}
      </div>
    );
  
}

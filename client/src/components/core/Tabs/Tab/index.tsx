import { memo } from "react";
import { TabProps } from "./props";
import styles from "./styles.module.scss";

function Tab<T>({ label, icon, isActive, handleSelect }: TabProps<T>) {
  return (
    <div
      className={`${styles.tab} ${isActive ? styles["tab--isActive"] : ""}`}
      onClick={handleSelect}
    >
      {label} {icon}
    </div>
  );
}

export default memo(Tab);

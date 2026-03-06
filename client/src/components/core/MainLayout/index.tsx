import { PropsWithChildren } from "react";
import styles from "./styles.module.scss";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.container}>
      <div className={styles.container__content}>{children}</div>
    </div>
  );
}

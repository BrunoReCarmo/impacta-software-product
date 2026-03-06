import { FormGroupProps } from "./props";
import styles from "./styles.module.scss";

export default function FormGroup({ children, label }: FormGroupProps) {
  return (
    <div className={styles.container}>
      <div className={styles.container__label}>{label}</div>
      {children}
    </div>
  );
}

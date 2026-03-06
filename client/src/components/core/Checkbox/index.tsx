import { CheckboxProps } from "./props";
import styles from "./styles.module.scss";

export default function Checkbox(props: CheckboxProps) {
  const { label = null, onClick } = props;

  return (
    <div className={styles.row} onClick={onClick}>
      <input type="checkbox" {...props} />
      {!!label && <div className={styles.row__label}>{label}</div>}
    </div>
  );
}

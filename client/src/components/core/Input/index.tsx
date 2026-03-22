"use client";

import { FieldValues } from "react-hook-form";
import { inputProps } from "./props";
import styles from "./styles.module.scss";

/**
 * @param props InputProps
 * @returns input component
 */
export default function Input<T extends FieldValues>(props: inputProps<T>) {
  const { register, name, className, type, ...rest } = props;

  if (type === "text") {
    return (
      <textarea
        className={`${styles.input} ${styles["input--text"]} ${className ?? ""}`}
        {...(register && name ? register(name) : { name })}
      />
    );
  }

  return (
    <input
      type={type}
      className={`${styles.input} ${className ?? ""}`}
      {...(register && name ? register(name) : { name })}
      {...rest}
    />
  );
}
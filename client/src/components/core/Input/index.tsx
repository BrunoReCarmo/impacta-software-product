"use client";

import { FieldValues } from "react-hook-form";
import { inputProps } from "./props";
import styles from "./styles.module.scss";
/**
 * @param props InputProps
 * @returns input component
 */
export default function Input<T extends FieldValues>(props: inputProps<T>) {
  const { register, name, className, ...rest } = props;
  return (
    <input
      className={`${styles.input} ${className}`}
      {...(register && name ? register(name) : { name })}
      {...rest}
    />
  );
}

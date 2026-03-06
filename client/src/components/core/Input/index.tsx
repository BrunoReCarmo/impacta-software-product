import styles from './styles.module.scss'
import { InputHTMLAttributes } from "react";
/**
 * @param props InputHTMLAttributes<HTMLInputElement>
 * @returns input component
 */
export default function Input
(props: InputHTMLAttributes<HTMLInputElement>) {
    return <input className={`${styles.input} ${props?.className}`} {...props}/>
}
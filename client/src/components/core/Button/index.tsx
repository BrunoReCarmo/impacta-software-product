import styles from './styles.module.scss'
import { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button className={`${styles.button} ${props?.className}`} {...props}/>
}
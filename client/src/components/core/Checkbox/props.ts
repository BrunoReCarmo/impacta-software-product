import { Nullable } from "@common/models"
import { InputHTMLAttributes } from "react";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: Nullable<string>,
}
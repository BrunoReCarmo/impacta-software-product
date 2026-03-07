import { InputHTMLAttributes } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface inputProps<T extends FieldValues> extends  InputHTMLAttributes<HTMLInputElement> {
    register?: UseFormRegister<T>
    name?: Path<T>;
}
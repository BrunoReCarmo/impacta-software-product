"use client"

import Content from "./Content";
import { AuthType } from "./Common/props";
import styles from "./styles.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import { useSignUp } from "@/api/auth/mutations";

export default function Auth() {
  const methods = useForm<AuthType>();
  const { mutate, isPending } = useSignUp(
    () => console.log('external')
  )

  const { handleSubmit } = methods;

  function onSubmit(data: AuthType) {
    mutate(data)
  }

  return (
    <FormProvider {...methods}>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <Content />
      </form>
    </FormProvider>
  );
}

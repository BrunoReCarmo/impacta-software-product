"use client"

import Content from "./Content";
import Options  from "./Options"
import { AuthType } from "./Common/props";
import styles from "./styles.module.scss";
import useAuthOptions from "@/hooks/useAuthOptions";
import { FormProvider, useForm } from "react-hook-form";

export default function Auth() {
  const methods = useForm<AuthType>();
  const { handleMutateAuth, isPending } = useAuthOptions()

  const { handleSubmit } = methods;

  function onSubmit(data: AuthType) {
    handleMutateAuth(data)
  }

  return (
    <FormProvider {...methods}>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <Options />
        <Content />
      </form>
    </FormProvider>
  );
}

"use client";

import Content from "./Content";
import Options from "./Options";
import { AuthType } from "./Common/props";
import styles from "./styles.module.scss";
import useAuthOptions from "@/hooks/useAuthOptions";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Auth() {
  const router = useRouter();
  const methods = useForm<AuthType>();

  function handleExternalOnSuccess() {
    router.push("/home");
    router.refresh();
  }

  const { handleMutateAuth, isPending } = useAuthOptions(
    handleExternalOnSuccess
  );

  const { handleSubmit } = methods;

  function onSubmit(data: AuthType) {
    handleMutateAuth(data);
  }

  return (
    <div className={styles.wrapper}>
      <FormProvider {...methods}>
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
          <Options />
          <Content />
        </form>
      </FormProvider>
    </div>
  );
}

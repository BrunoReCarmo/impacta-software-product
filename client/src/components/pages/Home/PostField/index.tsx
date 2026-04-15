"use client";

import Tags from "./Tags";
import styles from "./styles.module.scss";
import { CreatePostInputDTO } from "@common/dto";
import { Button, Input } from "@/components/core";
import { useCreatePost } from "@/api/post/mutations";
import { FormProvider, useForm } from "react-hook-form";
import UserChip from "@/components/core/MainLayout/Header/User";
import { useUserMe } from "@/api/user/useUserMe";
import useTranslation from "@/lib/i18n";
import FormGroup from "@/components/core/FormGroup";

export default function PostField() {
  const { user } = useUserMe();
  const { t } = useTranslation('common');
  const methods = useForm<CreatePostInputDTO>();

  const { handleSubmit, register, reset } = methods;

  function onSuccess() {
    reset();
  }
  const { mutate, isPending } = useCreatePost(onSuccess);


  function onSubmit(data: CreatePostInputDTO) {
    mutate(data);
  }

  return (
    <FormProvider {...methods}>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <UserChip onlyPic user={user} />
        <div className={styles.container__column}>
          <FormGroup label={t('chose_category')}>
            <Tags />
          </FormGroup>
          <FormGroup label={t('chose_title')}>
            <Input name="title" register={register} />
          </FormGroup>
          <FormGroup label={t('chose_description')}>
            <Input type="text" name="body" register={register} />
          </FormGroup>
          <div className={styles.container__column__actions}>
            <Button type="submit" disabled={isPending} style={{
              width: '200px'
            }}>
              {isPending ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

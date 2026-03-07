import { memo } from "react";
import { Input } from "@/components/core";
import FormGroup from "@/components/core/FormGroup";
import { AuthCommonComponentProps } from "../props";
import useTranslation from "@/lib/i18n";

function Name({ register }: AuthCommonComponentProps) {
  const { t } = useTranslation('common')
  
  return (
    <FormGroup label={t('name')}>
      <Input register={register} name="name" />
    </FormGroup>
  );
}

export default memo(Name)
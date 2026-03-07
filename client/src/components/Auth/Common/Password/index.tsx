"use client";

import useTranslation from "@/lib/i18n";
import { Checkbox, Input } from "@/components/core";
import FormGroup from "@/components/core/FormGroup";
import { AuthCommonComponentProps } from "../props";
import React, { memo, useMemo, useState } from "react";

function Password({register}: AuthCommonComponentProps) {
  const { t } = useTranslation("common");
  const [visible, setVisible] = useState<"password" | "text">("password");

  const checked: boolean =
    useMemo(() => visible === "text", [visible]) ?? false;

  function handleToggle() {
    setVisible(checked ? "password" : "text");
  }

  return (
    <React.Fragment>
      <FormGroup label="senha">
        <Input register={register} type={visible} name="password" required />
      </FormGroup>
      <Checkbox
        checked={checked}
        onChange={handleToggle}
        defaultChecked={false}
        label={t("see_passwd")}
      />
    </React.Fragment>
  );
}

export default memo(Password)
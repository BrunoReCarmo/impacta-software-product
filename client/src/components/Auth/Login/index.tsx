"use client";

import React, { useMemo, useState } from "react";
import { Button, Checkbox, Input } from "../../core";
import FormGroup from "@/components/core/FormGroup";

export default function Login() {
  const [visible, setVisible] = useState<"password" | "text">("password");

  const checked: boolean =
    useMemo(() => visible === "text", [visible]) ?? false;

  function handleToggle() {
    setVisible(checked ? "password" : "text");
  }

  return (
    <React.Fragment>
      <FormGroup label="email">
        <Input type="email" />
      </FormGroup>
      <FormGroup label="senha">
        <Input type={visible} />
      </FormGroup>
      <Checkbox onClick={handleToggle} checked={checked} label={"Ver senha"} />
      <Button>Login</Button>
    </React.Fragment>
  );
}

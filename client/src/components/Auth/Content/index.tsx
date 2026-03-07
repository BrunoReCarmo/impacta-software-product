
import React from "react";
import Email from "../Common/Email";
import Name from "../Common/Name";
import Password from "../Common/Password";
import { AuthType } from "../Common/props";
import SubmitButton from "../Common/Submit";
import { useFormContext } from "react-hook-form";

export default function Content() {
  const { register } = useFormContext<AuthType>();

  return (
    <React.Fragment>
      <Name register={register} />
      <Email register={register} />
      <Password register={register}/>
      <SubmitButton />
    </React.Fragment>
  );
}

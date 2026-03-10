
import React from "react";
import Email from "../Common/Email";
import Name from "../Common/Name";
import Password from "../Common/Password";
import { AuthType } from "../Common/props";
import SubmitButton from "../Common/Submit";
import { useFormContext } from "react-hook-form";
import useAuthOptions from "@/hooks/useAuthOptions";

export default function Content() {
  const { isRegister } = useAuthOptions();
  const { register } = useFormContext<AuthType>();

  return (
    <React.Fragment>
      {isRegister && <Name register={register} />}
      <Email register={register} />
      <Password register={register}/>
      <SubmitButton />
    </React.Fragment>
  );
}

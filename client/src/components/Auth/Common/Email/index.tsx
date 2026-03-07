import { memo } from "react";
import { Input } from "@/components/core";
import FormGroup from "@/components/core/FormGroup";
import { AuthCommonComponentProps } from "../props";

function Email({ register }: AuthCommonComponentProps) {
  return (
    <FormGroup label="email">
      <Input register={register} name="email" type="email" required/>
    </FormGroup>
  );
}

export default memo(Email)